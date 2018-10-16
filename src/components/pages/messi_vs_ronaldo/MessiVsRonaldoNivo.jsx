import React, {Component} from 'react';
import { Line } from '@nivo/line';

class MessiVsRonaldoNivo extends Component {
    state = {
        data: [
            {
                id: 'Messi',
                data: [
                    {x: '08/01/2018',y: 7},
                    {x: '15/01/2018',y: 5},
                    {x: '23/01/2018',y: 11},
                ],
            },
            {
                id: 'Ronaldo',
                data: [
                    {x: '11/01/2018', y: 14},
                    {x: '18/01/2018', y: 14},
                    {x: '25/01/2018',y: 15},
                ]
            }
        ]
    };

    componentDidMount() {
        let api_host = "https://django-rest-api.us-east-2.elasticbeanstalk.com/";
        if(window.location.hostname.toLowerCase() === "localhost") {
            api_host = "https://localhost:8000/";
        }
        const url = api_host + `player_popularities/data/`;
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
                const date_options = {year: 'numeric', month: '2-digit', day: '2-digit' }
                console.log(result)
                let temp_data = []
                result.forEach((player, i) => {
                    //alert(JSON.stringify(player))
                    temp_data[i] = { id: player["common_name"], data: []}
                    const pop_data = JSON.parse(player["popularity_data"])
                    for (let key in pop_data["epoch"]) {
                        let value = pop_data["value"][key]
                        let epoch = pop_data["epoch"][key]
                        const date = (new Date(epoch)).toLocaleDateString('en-GB', date_options)
                        temp_data[i]["data"].push({x:date, y:value})
                    }
                });
                console.log(temp_data)
                this.setState({data:temp_data})
            },
            (error) => {
                alert(error)
            }
        )
    }

    render() {
        return (
            <div>
                <h2>Messi vs . Ronaldo </h2>
                <Line
                    width={1200} height={400}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 80
                    }}
                    data={this.state.data}
                    animate
                    xScale={{type: 'time', format: '%d/%m/%Y',
                        precision: 'day',
                    }}
                    yScale={{type: 'linear',stacked: false}}
                    axisBottom={{format: '%m %Y'}}
                    curve="monotoneX"
                    //enableDotLabel
                />

            </div>
        );
    }
}

MessiVsRonaldoNivo.propTypes = {};

export default MessiVsRonaldoNivo;