import React, { Children } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ReactJson from 'react-json-view'
import TabContainer from './TabContainer'
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
                        textColor="primary" variant="fullWidth">

                    <Tab label="Result" />
                    <Tab label="Full analyze" />

                </Tabs>
            </AppBar>

            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={tabIndex}
                            onChangeIndex={handleChangeIndex}>
                <TabContainer dir={theme.direction}>{props.result}</TabContainer>
                <ReactJson src={props.fullAnalyze} enableClipboard={false} displayDataTypes={false} name={null} style={{ 'paddingTop': '10px' }}></ReactJson>
            </SwipeableViews>

        </div>
    )
}
