import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const CounterApp = () => {
    const [count, setCount] = useState(0);

    return (
        <View>
            <Text>Count: {count}</Text>
            <Button title="Increment" onPress={() => setCount(count + 1)} />
            <Button title="Decrement" onPress={() => setCount(count - 1)} />
        </View>
    );
};

export default CounterApp;