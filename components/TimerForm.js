import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import { default as UUID } from 'uuid';
import uuid from 'react-native-uuid';

class TimerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            project: ''
        }
    }
    componentDidMount() {
        this.setState({
            title: this.props.id ? this.props.title : '',
            project: this.props.id ? this.props.project : ''
        })
    }

    handleChangeTitle = (text) => (
        this.setState({
            title: text
        })
    )

    handleChangeProject = (text) => (
        this.setState({
            project: text
        })
    )

    handleSubmit = () => {
        const { title, project } = this.state;
        if (!this.props.id) {
            const obj = {
                id: uuid.v1(),
                title: title,
                project: project
            }
            this.props.onCreateTimer(obj);
        }
        if (this.props.id) {
            const obj = {
                id: this.props.id,
                title: title,
                project: project
            }
            this.props.onUpdateTimer(obj);
        }
    }

    render() {
        const { title, project } = this.state;
        const submitText = this.props.id ? 'Update' : 'Create';
        return (
            <View style={styles.formcontainer}>
                <View style={styles.attributecontainer}>
                    <Text style={styles.label}>
                        Title
                    </Text>
                    <TextInput style={styles.textInput}
                        underlineColorAndroid="transparent"
                        defaultValue={title}
                        onChangeText={this.handleChangeTitle}
                        value={this.state.title} />
                </View>
                <View style={styles.attributecontainer}>
                    <Text style={styles.label}>Project</Text>
                    <TextInput style={styles.textInput}
                        underlineColorAndroid="transparent"
                        defaultValue={project}
                        onChangeText={this.handleChangeProject}
                        value={this.state.project} />
                </View>
                <View styles={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button1}
                        onPress={this.handleSubmit} >
                        <Text style={styles.buttonText}>{submitText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2}
                        onPress={this.props.onCancelSubmit}  >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    formcontainer: {
        backgroundColor: "white",
        borderRadius: "black",
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0
    },
    attributecontainer: { marginVertical: 8 },
    label: { fontSize: 17, fontWeight: 'bold', marginBottom: 5, },
    textInput: { height: 30, padding: 5, fontSize: 12, borderWidth: 1 },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button1: {
        marginTop: 10, minWidth: 100, borderWidth: 2, borderRadius: 3, borderColor: 'blue'
    },
    button2: {
        marginTop: 10, minWidth: 100, borderWidth: 2, borderRadius: 3, borderColor: 'red'
    },
    buttonText: { textAlign: 'center', fontWeight: 'bold' }
})

export default TimerForm;