import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
    gridRoot: {

    },
    menu: {
        width: 200,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class MultiChoiceQuestion extends Component {
    render() {
        const {question_data, classes, handleChange} = this.props;
        return (
            <div>
                <Grid container={true} spacing={8} alignItems={"center"} alignContent={"center"}
                      justify={"space-evenly"} className={classes.gridRoot}>
                    <Grid item xs={6}>
                        <Typography variant={"body1"} align={"center"}>
                            {question_data.question}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            select
                            label="Select"
                            className={classes.textField}
                            value={question_data["selected_choice"]["choice_no"]}
                            onChange={(e, chosenElement)=>handleChange(e, question_data.id, chosenElement)}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select your answer"
                            margin="normal"
                            variant="outlined"
                        >
                            { Object.keys(question_data.choices).map( i => (
                                <MenuItem key={i} value={i}>
                                    {question_data.choices[i]}
                                </MenuItem>
                            ))}
                        </TextField>
                        </form>
                    </Grid>
                </Grid>
            </div>

        );
    }
}
MultiChoiceQuestion.propTypes = {
    classes: PropTypes.object.isRequired
};

MultiChoiceQuestion.defaultProps = {
    value: ""
};

export default withStyles(styles)(MultiChoiceQuestion);