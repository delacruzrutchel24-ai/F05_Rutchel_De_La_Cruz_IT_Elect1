import React, { useState } from 'react';
import { View, Button } from 'react-native';

const ColorChangerApp = () => {
    const [bgColor, setBgColor] = useState('white');

    return (
        <View style={{ flex: 1, backgroundColor: bgColor }}>
            <Button title="Light Blue" onPress={() => setBgColor('lightblue')} />
            <Button title="Default" onPress={() => setBgColor('white')} />
            <Button title="Another Color" onPress={() => setBgColor('lightgreen')} />
        </View>
    );
};

export default ColorChangerApp;