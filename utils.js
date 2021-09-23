import uuid from 'react-native-uuid';

export const newTimer = (attrs = {}) => {
    const timer = {
        id: uuid.v1(),
        title: attrs.title || 'Title',
        project: attrs.project || 'Project',
        isRunning: false,
        elapsed: 0
    }
    return timer
}

export const millisecondsToHuman = ms => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);

    const humanized = [
        pad(hours.toString(), 2),
        pad(minutes.toString(), 2),
        pad(seconds.toString(), 2),
    ].join(':');

    return humanized;
};

const pad = (numberString, size) => {
    let padded = numberString;
    while (padded.length < size) {
        padded = `0${padded}`;
    }
    return padded;
};
