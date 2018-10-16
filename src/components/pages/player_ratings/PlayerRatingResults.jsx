import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import PlayerResultRow from "./components/results/PlayerResultRow";
import Divider from "@material-ui/core/Divider/Divider";
import Grid from "@material-ui/core/Grid/Grid";

const styles = {};

class PlayerRatingResults extends Component {
    state = {
        player_data: {},
        match_info: {},
        status: "Fetching data"
    };

    componentDidMount() {
        Promise.all([this.fetchPlayers(), this.fetchRatingData(), this.fetchMatchInfo()])
            .then(([player_result, rating_data_result, match_info_result]) => {
                //alert("fetched all");
                console.log("player_result", player_result);
                console.log("rating_data", rating_data_result);
                console.log("match_info", match_info_result);
                let average_ratings = {};
                rating_data_result.map((rating_instance, i) => {
                    let pi = rating_instance['player'];
                    if(!(pi in average_ratings)) {
                        average_ratings[pi]={sum:0, n:0}
                    }
                    average_ratings[pi]["sum"]+=rating_instance["rating"];
                    average_ratings[pi]["n"]++;
                });
                const players_with_ratings = {};
                Object.entries(average_ratings).forEach(([key, value])=>{
                    average_ratings[key] = value["sum"]/value["n"];
                    player_result.map(function(player){
                        if(player.id==key) {
                            player["rating"] = average_ratings[key];
                            players_with_ratings[key] = player;
                        }
                    });
                });

                match_info_result["number_of_responses"] = rating_data_result.length/Object.keys(players_with_ratings).length;
                console.log(average_ratings);
                console.log(player_result);
                console.log(players_with_ratings);
                this.setState({player_data: players_with_ratings, match_info: match_info_result, status: ""})
            }, (error) => {
                this.setState({status: "Error while loading data"});
                    alert("Something went wrong while fetching data, sorry")
                    console.log("Error while fetching data", error)
                }
        );
    }

    fetchRatingData() {
        let api_host = "https://django-rest-api.us-east-2.elasticbeanstalk.com/";
        if(window.location.hostname.toLowerCase() === "localhost") {
            api_host = "https://localhost:8000/";
        }
        let url = api_host + "player_ratings/ratings_latest_match/";
        const init = {
            method: 'GET',
            mode: 'cors'
        };
        const request = new Request(url, init);
        return fetch(request).then(res => res.json());
    }
    fetchPlayers() {
        let api_host = "https://django-rest-api.us-east-2.elasticbeanstalk.com/";
        if(window.location.hostname.toLowerCase() === "localhost") {
            api_host = "https://localhost:8000/";
        }
        let url = api_host + "player_ratings/players/";
        const init = {
            method: 'GET',
            mode: 'cors'
        };
        const request = new Request(url, init);
        return fetch(request).then(res => res.json());
    }

    fetchMatchInfo() {
        let api_host = "https://django-rest-api.us-east-2.elasticbeanstalk.com/";
        if(window.location.hostname.toLowerCase() === "localhost") {
            api_host = "https://localhost:8000/";
        }
        let url = api_host + "player_ratings/latest_match/";
        const init = {
            method: 'GET',
            mode: 'cors'
        };
        const request = new Request(url, init);
        return fetch(request).then(res => res.json());
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <p>{this.state.status}</p>
                <h1>Player Rating Results for match vs {this.state.match_info["opposition_name"]}</h1>
                <h4>Match date: {this.state.match_info["date"]}</h4>
                <h4>Number of responses: {this.state.match_info["number_of_responses"]}</h4>
                <Divider/>
                <Grid container={true} spacing={16} className={classes.root}>
                    <Grid item xs={12}>
                        {
                            Object.keys(this.state.player_data).map( i => (
                                <PlayerResultRow key={i} player_data={this.state.player_data[i]}/>
                            ))
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

PlayerRatingResults.propTypes = {
    classes: PropTypes.object.isRequired
};

PlayerRatingResults.defaultProps = {};

export default withStyles(styles)(PlayerRatingResults);