/**
 * Created by Raphson on 7/3/16.
 */
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

export default class MasterPage extends React.Component {
    render() {
        return (
                <span>
                    { this.props.children }
                </span>
        );
    }
}