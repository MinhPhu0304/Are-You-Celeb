import React, { Children } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

function TabContainer({ children, dir }) {
    console.log(children)
    return children.map((element,index) =>
    (<Typography key={index} component='div' dir={dir} style={{ padding: 8 * 2 }}>
            {element}
    </Typography>)
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
  };

// Dump component. Only show the props pass down

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
    },
  }));

export default function ResultPanel(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [tabIndex, setValue] = React.useState(0); // Initial index will be 0 which is the first tab element

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function handleChangeIndex(index) {
        setValue(index);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs   value={tabIndex}   onChange={handleChange} indicatorColor="primary"
                        textColor="primary" variant="fullWidth" centered>

                    <Tab label="Result" />
                    <Tab label="Full analyze" />

                </Tabs>
            </AppBar>

            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={tabIndex}
                            onChangeIndex={handleChangeIndex}>
                <TabContainer dir={theme.direction}>{props.result}</TabContainer>
                {/* Dirty hack to convert the json result to array because result props could be an array */}
                <TabContainer dir={theme.direction}>{ new Array(props.fullAnalyze) }</TabContainer>
            </SwipeableViews>

        </div>
    )
}
