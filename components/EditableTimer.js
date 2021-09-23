/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React, { Component } from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import TimerForm from './TimerForm';
import Timer from './Timer';

class EditableTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editFormOpen: false
        }
    }
    handleUpdateTimer = (obj) => {
        this.setState({
            editFormOpen: false
        })
        this.props.onUpdateTimer(obj);
    }

    handleCancelSubmit = () => (
        this.setState({
            editFormOpen: false
        })
    )

    handleEditClick = () => (
        this.setState({
            editFormOpen: true
        })
    )

    onDeleteClick = () => (
        this.props.onDeleteClick(this.props.id)
    )

    render() {
        const { id, title, project, elapsed, isRunning } = this.props;
        if (this.state.editFormOpen) {
            return (
                <TimerForm id={id}
                    title={title}
                    project={project}
                    onUpdateTimer={this.handleUpdateTimer}
                    onCancelSubmit={this.handleCancelSubmit} />
            )
        }
        return (
            <Timer id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
                onEditClick={this.handleEditClick}
                onDeleteClick={this.onDeleteClick}
                toggleTimer={this.props.toggleTimer} />
        )
    }
}

export default EditableTimer;