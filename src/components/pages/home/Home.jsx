import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CssBaseline, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Card from "@material-ui/core/Card/Card";
import classNames from 'classnames';
import Typography from "@material-ui/core/Typography/Typography";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";


const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
    cardAction: {
        display: 'block',
        textAlign: 'initial'
    }
});

const cards = [{id: 1, img_file_name: "rm_data_analysis.jpg", heading: "Real Madrid data analysis",
    description: "Text sentimentality analysis using Python, Pandas and Statsmodel", url: window.location.origin + "/r-realmadrid-behaviour.html"},
    {id: 2, img_file_name: "cr7_vs_lm10.jpg", heading: "Ronaldo vs Messi popularity",
        description: "Data collection and visualization", url: window.location.origin + "/#/messi_vs_ronaldo"},
    {id: 3, img_file_name: "player_ratings.jpg", heading: "Player Ratings web app",
        description: "Rate players after matches and show summary of results", url: window.location.origin + "/#/player_ratings"},
    {id: 4, img_file_name: "fibre_orientation.png", heading: "3D Fibre Orientation calculation",
        description: "Image processing of z-layer images to determine orientation of fibres", url: "https://github.com/ankursharma319/fibre_orientation"},
    {id: 5, img_file_name: "eurobot.png", heading: "Eurobot Arduino development",
        description: "Controlling robot's actuators and sensors using Arduino", url: "https://github.com/ankursharma319/eurobot"},
    {id: 6, img_file_name: "cric_sim_1.png", heading: "Cricket Simulation",
        description: "Cricket simulation using data and statistical methods", url: "https://github.com/ankursharma319/ipl_manager"},
    {id: 7, img_file_name: "campushack.jpg", heading: "Campus Hack",
        description: "A Java websockets application for detecting which computers in lab are free", url: "https://github.com/ankursharma319/CampusHack-2018"},
    {id: 8, img_file_name: "line_launcher.png", heading: "Python modelling",
        description: "Modelling systems such as line launcher and aerofoil optimization", url: "https://github.com/ankursharma319/python_misc"},
];

class Home extends Component {
    render() {
        const {classes} = this.props;
        const images_folder = window.location.origin + "/images/home/";

        return (
            <div>
            <CssBaseline />
            <main>
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="display1" align="center" color="textPrimary" gutterBottom>
                            Ankur's website
                        </Typography>
                        <Typography variant="subheading" align="center" color="textSecondary" paragraph>
                            Here you will find some of the projects I have been working on. Some of these are concerned with my hobbies - i.e. Real Madrid, Cristiano Ronaldo, Cricket etc, while others are
                            school work.
                            <p>
                            I love software development in general but I am particularly interested in data analysis, machine learning, natural language processing and image processing.
                            </p>
                        </Typography>
                    </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                <Grid container spacing={40}>
                    {cards.map(card => (
                        <Grid item key={card.id} sm={6} md={4}>
                            <Card className={classes.card}>
                                <ButtonBase
                                    className={classes.cardAction}
                                    onClick={event => {
                                        window.location.href = card.url;
                                    }}
                                >
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={images_folder+card.img_file_name}
                                    src={images_folder+card.img_file_name}
                                    title={card.img_file_name.split(".jpg")[0]}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="headline" component="h2">
                                        {card.heading}
                                    </Typography>
                                    <Typography>
                                        {card.description}
                                    </Typography>
                                </CardContent>
                                </ButtonBase>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                </div>
            </main>
                {/* Footer */}
                <footer className={classes.footer}>
                    <Typography variant="body2" align="center" gutterBottom>
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" component="p">
                    </Typography>
                </footer>
                {/* End footer */}
                </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);