import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs-2';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
    otherWorkRoot: {
        //minHeight: '60vh',
        maxHeight: '70vh',
        maxWidth: '90vw',
        flexGrow: 1,
        margin: 'auto'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

const ini_options = {
    maintainAspectRatio: false,
    title: {
        display: true,
        text: 'Player popularity over time on Reddit'
    },
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                minUnit: 'month',
                tooltipFormat: 'll',
                min: new Date("2017-08-01"),
                max: new Date("2018-06-30")
            },
            bounds: 'ticks',
            scaleLabel: {
                display: true,
                labelString: "Time"
            }
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: "Popularity Metric"
            }
        }]
    },
    legend: {
        position: 'bottom'
    },
    elements: {
        line: {
            tension: 0
        }
    },
    animation: {
        duration: 0, // general animation time
    },
    hover: {
        animationDuration: 0, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0, // animation duration after a resize
};

const ini_data = {
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,0.7)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
                {t: new Date("05/05/2017"),y: 10},
                {t: new Date("01/07/2017"),y: 15},
                {t: new Date("01/01/2017"),y: 7},
            ]
        }
    ]
};

class MessiVsRonaldo extends Component {
    state = {
        options: {},
        data: {},
        width: 700,
        height: 400
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    componentDidMount() {
        let api_host = "https://django-rest-api.us-east-2.elasticbeanstalk.com/";
        if(window.location.hostname.toLowerCase() === "localhost") {
            api_host = "https://localhost:8000/";
        }
        const url = api_host + "player_popularities/data/";
        //const content = {"code":code, "provider":provider};
        const headers = new Headers();
        //headers.append("Content-Type", "application/json");

        const init = {
            method: 'GET',
            headers: headers,
            //body: JSON.stringify(content),
            mode: 'cors'
        };
        const request = new Request(url, init);
        fetch(request).then(res => res.json()).then(
            (result) => {
                //console.log(result)
                let temp_data = {"datasets":[]}
                result.forEach((player, i) => {
                    temp_data["datasets"][i] = {...ini_data["datasets"][0]}
                    temp_data["datasets"][i]["label"] = player["common_name"]
                    const r = this.getRandomInt(0,255)
                    const g = this.getRandomInt(0,255)
                    const b = this.getRandomInt(0,255)
                    temp_data["datasets"][i]["borderColor"] = 'rgba('+r+','+g+','+b+',0.7)'
                    temp_data["datasets"][i]["backgroundColor"] = 'rgba('+r+','+g+','+b+',0.4)'
                    temp_data["datasets"][i]["pointBorderColor"] = 'rgba('+r+','+g+','+b+',1)'
                    temp_data["datasets"][i]["data"] = []
                    const pop_data = JSON.parse(player["popularity_data"])
                    for (let key in pop_data["epoch"]) {
                        let value = pop_data["value"][key]
                        let epoch = pop_data["epoch"][key]
                        const date = new Date(epoch)
                        temp_data["datasets"][i]["data"].push({t:date, y:value})
                    }
                });
                //console.log(temp_data)
                this.setState({data:temp_data, options:ini_options})
            },
            (error) => {
                alert("Something went wrong while fetching data, sorry")
                console.log("Error while fetching data", error)
            }
        )

        //this.setState({options: options, data: data})
    }

    handleDateChange(event) {
        const new_value = new Date(event.target.value)
        const id = event.target.id
        const _options = {...this.state.options}
        if(id == "date1") {
            _options.scales.xAxes[0].time.min = new_value
        } else if(id == 'date2') {
            _options.scales.xAxes[0].time.max = new_value
        }
        //_state.options.scales.xAxes[0].time.min = new Date(event.target.value)
        //alert(_state.options.scales.xAxes[0].time.min)
        console.log("state changed")
        this.setState({...this.state, options: _options}, ()=> {
            console.log("Callback state updated ", this.state.options.scales.xAxes);
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.otherWorkRoot}>
                <h2>Player popularities comparison</h2>
                <Line data={this.state.data} options={this.state.options} key={Math.random()}/>
                <br/>
                <form className={classes.container}>
                    <Grid container={true} spacing={16} className={classes.root}>
                        <Grid item xs={12}>
                            <TextField
                                id="date1"
                                label="From"
                                type="date"
                                defaultValue="2017-08-01"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event)=> this.handleDateChange(event)}
                            />
                            <TextField
                                id="date2"
                                label="To"
                                type="date"
                                defaultValue="2018-06-30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event)=> this.handleDateChange(event)}
                            />
                        </Grid>
                    </Grid>
                </form>
                <p>Data collected from subreddit r/soccer using Pushshift API</p>
            </div>
        );
    }
}

MessiVsRonaldo.propTypes = {};

export default withStyles(styles)(MessiVsRonaldo);