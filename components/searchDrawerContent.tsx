import { useState } from "react";
import { Drawer } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const searchDrawerContent = () => {
    const [active, setActive] = useState('first');
    return (
        <View style={styles.container}>
            <Drawer.Section>
                <Drawer.Item
                    label="First Item"
                    active={active === 'first'}
                    onPress={() => setActive('first')}
                />
                <Drawer.Item
                    label="Second Item"
                    active={active === 'second'}
                    onPress={() => setActive('second')}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default searchDrawerContent;