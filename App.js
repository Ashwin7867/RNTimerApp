/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './utils';
import uuid from 'react-native-uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: [
        {
          id: uuid.v1(),
          title: 'Move the Lawn',
          project: 'House Chores',
          elapsed: 87987,
          isRunning: true,
        },
      ],
    };
  }

  componentDidMount() {
    const TIME_INTERVAL = 1000;
    this.intervalId = setInterval(() => {
      const { timers } = this.state;
      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        }),
      });
    }, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleCreateTimer = obj => {
    this.setState({
      timers: [newTimer(obj), ...this.state.timers],
    });
  };

  handleUpdateTimer = obj => {
    const { title, project } = obj;
    const timerlst = this.state.timers.map(timer => {
      if (timer.id === obj.id) {
        return {
          ...timer,
          title,
          project,
        };
      }
      return timer;
    });
    this.setState({
      timers: timerlst,
    });
  };

  handleDeleteClick = id =>
    this.setState({
      timers: this.state.timers.filter(t => t.id !== id),
    });

  handleToggleTimer = id => {
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === id) {
          const isRunning = timer.isRunning;
          return {
            ...timer,
            isRunning: !isRunning,
          };
        }
        return timer;
      }),
    });
  };
  render() {
    const editabletimer = this.state.timers.map(timer => (
      <EditableTimer key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        isRunning={timer.isRunning}
        onUpdateTimer={this.handleUpdateTimer}
        onDeleteClick={this.handleDeleteClick}
        toggleTimer={this.handleToggleTimer}
      />
    ));
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerlist}>
          <ToggleableTimerForm onCreateTimer={this.handleCreateTimer} />
          {editabletimer}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: { flex: 1 },
  titleContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  timerlist: {
    paddingBottom: 15,
  },
});

export default App;
