import TimerForm from './TimerForm';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class ToggleableTimerForm extends Component {
    constructor(props) {
        super(props);
        this.state = { isFormOpen: false }
    }
    onPress = () => (
        this.setState({
            isFormOpen: true
        })
    )
    handleCreateTimer = (obj) => {
        this.props.onCreateTimer(obj);
        this.setState({
            isFormOpen: false
        })
    }

    handleCancelSubmit = () => (
        this.setState({
            isFormOpen: false
        })
    )
    render() {
        const isOpen = this.state.isFormOpen;
        if (isOpen) {
            return (
                <View style={styles.container}>
                    <TimerForm onCreateTimer={this.handleCreateTimer}
                        onCancelSubmit={this.handleCancelSubmit} />
                </View>
            )
        }
        return (
            <TouchableOpacity style={styles.button}
                onPress={this.onPress}  >
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>+</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: { paddingHorizontal: 10, },
    button: { paddingHorizontal: 10, borderWidth: 1, backgroundColor: 'grey', textAlign: 'center' }
})

export default ToggleableTimerForm;