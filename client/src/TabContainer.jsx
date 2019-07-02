import React from 'react';
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';

export default function TabContainer({ children, dir }) {
    return children.map((element, index) => (
    <Typography key={index} component='div' dir={dir} style={{ padding: 8 * 2 }}>
        {element}
    </Typography>));
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
  };
