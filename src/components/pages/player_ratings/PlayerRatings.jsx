import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import PlayerRatingComponent from "./components/PlayerRatingComponent";
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";
import ManOfTheMatch from "./components/ManOfTheMatch";
import MultiChoiceQuestion from "./components/MultiChoiceQuestion";

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
    1: {id: 1, question: "Who is best player ever?", choices: {1: "Choice 1", 2: "Choice 2", 3: "Choice 3", 4: "Choice 4"}, selected_choice: {choice_no: -1, choice_text: ""}},
};

class PlayerRatings extends Component {
    state = {
        players_data: {},
        questions_data: {},
        potm: {},
    };

    componentDidMount() {
        //const answers = {};
        /*Object.keys(questions_data).map( key => (
            answers[key] = { question_id:key, choice_no: -1, choice_text: ""}
        ));*/

        this.setState(
            {
                potm: {player_id: -1, player_common_name: ""},
                questions_data: questions_data,
                players_data : players_data,
            },
            ()=> {
                alert("Callback " + JSON.stringify(this.state));
            }
        );
    }

    handleSubmit = (event) => {
        alert("Submitting");
    };

    handleMotmChange = (event, player_id, player_common_name) => {
        this.setState({ potm: {player_id: player_id, player_common_name: player_common_name }});
    };

    handleMultiChoiceAnswerChange = (e, question_id, value) => {
        console.log("question id ", question_id);
        console.log("event ", e);
        console.log("value ", value.props.value);
        console.log("value text ", value.props.children);
        //const answers = {... this.state.answers};
        /*answers[question_id] = {
            question_id: question_id,
            choice_no: choice_no,
            choice_text: choice_text
        };
        this.setState({answers:answers});*/
    }

    handleRatingChange = (event, player_id, value) => {
        const players_data = {...this.state.players_data};
        players_data[player_id]["rating"] = value;
        this.setState({
            players_data: players_data
        });
    }

    render() {
        const {classes} = this.props;
        if(Object.keys(this.state.players_data).length < 1) {
            return <h2>Loading</h2>;
        }
        return (
            <div className={classes.root}>
                <h1>Player Ratings</h1>
                <Divider/>
                <Grid container={true} spacing={16} className={classes.root}>
                    <Grid item xs={12}>
                        {
                            Object.keys(players_data).map( i => (
                                <PlayerRatingComponent key={i} player_data={players_data[i]} handleChange={this.handleRatingChange}/>
                            ))
                        }
                    </Grid>

                    <Grid item xs={12}>
                        <ManOfTheMatch players_data={players_data} handleChange={this.handleMotmChange}/>
                    </Grid>
                    {Object.keys(questions_data).map( i => (
                        <Grid item xs={12} key={i}>
                            <MultiChoiceQuestion question_data={questions_data[i]}
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