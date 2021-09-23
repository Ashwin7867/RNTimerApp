import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { millisecondsToHuman } from '../utils';

class Timer extends Component {
    constructor(props) {
        super(props);
    }

    onStartPress = () => {
        const id = this.props.id;
        this.props.toggleTimer(id);
    }
    onStopPress = () => {
        const id = this.props.id;
        this.props.toggleTimer(id);
    }
    
    render() {
        const { id, title, project, elapsed, isRunning } = this.props;
        const elapsed_new = millisecondsToHuman(elapsed);
        return (
            <View style={styles.timerContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.project}>{project}</Text>
                <Text style={styles.elapsedString}>{elapsed_new}</Text>
                <View style={styles.changeButtonGroup}>
                    <TouchableOpacity style={styles.button}
                        onPress={this.props.onEditClick}>
                        <Text style={{ color: 'white' }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={this.props.onDeleteClick} >
                        <Text style={{ color: 'white' }}>Delete</Text>
                    </TouchableOpacity>
                </View>
                {!isRunning && <TouchableOpacity style={styles.startButton}
                    onPress={this.onStartPress}  >
                    <Text style={{ textAlign: 'center' }}>Start</Text>
                </TouchableOpacity>}
                {isRunning && <TouchableOpacity style={styles.startButton}
                    onPress={this.onStopPress} >
                    <Text style={{ textAlign: 'center' }}>Stop</Text>
                </TouchableOpacity>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    timerContainer: {
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0
    },
    title: { fontSize: 17, fontWeight: 'bold' },
    project: { fontSize: 12 },
    elapsedString: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingVertical: 15 },
    changeButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    button: {
        backgroundColor: 'blue',
        padding: 3,
        borderWidth: 2,
        borderRadius: 4
    },
    startButton: {
        backgroundColor: 'yellow',
        color: 'black',
        borderWidth: 2,
        borderRadius: 8
    }
})

export default Timer;