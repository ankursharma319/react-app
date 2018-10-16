import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import PlayerRatingComponent from "./components/PlayerRatingComponent";
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";
import MultiChoiceQuestion from "./components/MultiChoiceQuestion";
import {Link} from "react-router-dom";

const styles = {
    root: {
        flexGrow: 1
    },
};

let players_data = {
    1: {id: 1, first_name: "Sergio", last_name: "Ramos", common_name: "Ramos", shirt_no : 4, last_3_ratings: [4.5, 7.54, 6.54], rating: 6.25},
    2: {id: 2, first_name: "Raphael", last_name: "Varane", common_name: "Varane", shirt_no : 5, last_3_ratings: [6, 9.54, 5.2], rating: 6.25},
    3: {id: 3, first_name: "", last_name: "Marcelo", common_name: "Marcelo", shirt_no : 6, last_3_ratings: [7, 7.54, 6], rating: 6.25},
    4: {id: 4, first_name: "Mariano", last_name: "Diaz", common_name: "Mariano", shirt_no : 7, last_3_ratings: [9.5, 5.54, 8.0], rating: 6.25},
};

let questions_data = {
    1: {id: 1, question: "Player of the match?", choices: {}, selected_choice: {choice_no: -1, choice_text: ""}},
    2: {id: 2, question: "Who is best player ever?", choices: {1: "Choice 1", 2: "Choice 2", 3: "Choice 3", 4: "Choice 4"}, selected_choice: {choice_no: -1, choice_text: ""}},
};

class PlayerRatings extends Component {
    state = {
        players_data: {},
        questions_data: {},
        match_id: -1,
        status: "Loading"
    };

    componentDidMount() {
        //const answers = {};
        /*Object.keys(questions_data).map( key => (
            answers[key] = { question_id:key, choice_no: -1, choice_text: ""}
        ));*/

        this.fetchPlayers().then((players_result)=>{
            let player_data = {}
            players_result.map((item, i)=>{
                if(i<15) {
                    player_data[item["id"]] = {...item, "rating": 6.25, "last_3_ratings": []}
                }
            });

            questions_data[1]["choices"] = {};
            Object.keys(player_data).map( key => (
                questions_data[1]["choices"][key] = player_data[key]["common_name"]
            ));

            console.log(players_result);
            this.setState({
                questions_data: questions_data,
                players_data: player_data,
                match_id: 1,
                status:"",
            })
        });

        /*this.setState(
            {
                questions_data: questions_data,
                players_data : players_data,
                match_id: 1
            },
            ()=> {
                //alert("Callback " + JSON.stringify(this.state));
            }
        );*/
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

    handleSubmit = (event) => {
        //const api_host = "https://localhost:8000/";
        //const url = api_host + `player_ratings/submit/`;
        //const content = {"code":code, "provider":provider};
        //const headers = new Headers();
        //headers.append("Content-Type", "application/json");

        /*const init = {
            method: 'POST',
            headers: headers,
            //body: JSON.stringify(content),
            mode: 'cors'
        };*/
        //const request = new Request(url, init);
        alert("Player Ratings submissions for this match not open yet")
        /*fetch(request).then(res => res.json()).then(
            (result) => {
                alert(JSON.stringify(result))
            },
            (error) => {
                alert(error)
            }
        )*/
    };

    handleMultiChoiceAnswerChange = (e, question_id, value) => {
        console.log("question id ", question_id);
        console.log("value ", value.props.value);
        console.log("value text ", value.props.children);
        let questions_data = {... this.state.questions_data};
        questions_data[question_id]["selected_choice"]["choice_no"] = value.props.value;
        questions_data[question_id]["selected_choice"]["choice_text"] = value.props.children;
        this.setState({questions_data:questions_data});
    }

    handleRatingChange = (event, player_id, value) => {
        //alert("here");
        //console.log(event, player_id, value);
        const players_data = {...this.state.players_data};
        players_data[player_id]["rating"] = value;
        this.setState({
            players_data: players_data
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <h1>Player Ratings</h1>
                <h3>Submissions not open at this time - check previous results <Link to="/player_rating_results">here</Link></h3>
                <h3>{this.state.status}</h3>
                <Divider/>
                <Grid container={true} spacing={16} className={classes.root}>
                    <Grid item xs={12}>
                        {
                            Object.keys(this.state.players_data).map( i => (
                                <PlayerRatingComponent key={i} player_data={this.state.players_data[i]} handleChange={this.handleRatingChange}/>
                            ))
                        }
                    </Grid>
                    {Object.keys(this.state.questions_data).map( i => (
                        <Grid item xs={12} key={i}>
                            <MultiChoiceQuestion question_data={this.state.questions_data[i]}
                                                 handleChange={this.handleMultiChoiceAnswerChange}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

PlayerRatings.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PlayerRatings);