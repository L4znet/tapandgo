import { useState } from "react";
import { Text, Drawer, SegmentedButtons } from "react-native-paper";
import { SafeAreaView, StyleSheet, View } from "react-native";



const SearchDrawerContent = () => {
    const [isBiclooAvailable, setIsBiclooAvailable] = useState('yes');
    const [isStationOpened, setIsStationOpened] = useState('all');

    const DrawerContentItem = ({title, children}) => {
        return (
            <View style={styles.drawerItem}>
                <Text style={styles.drawerItemTitle}>{title}</Text>
                {children}
            </View>
        )
    }
    const DrawerContent = () => {
        return (
            <View style={styles.drawerContent}>
                <Text style={styles.drawerContentTitle}>Filtres</Text>
                <DrawerContentItem title={"Ouverte / fermée"}>
                    <SegmentedButtons
                        value={isStationOpened}
                        onValueChange={setIsStationOpened}
                        buttons={[
                            {
                                value: 'all',
                                label: 'Toutes',
                            },
                            {
                                value: 'opened',
                                label: 'Ouverte',
                            },
                            {
                                value: 'closed',
                                label: 'Fermée',
                            },
                        ]}
                    />
                </DrawerContentItem>
                <DrawerContentItem title={"Bicloo disponible ?"}>
                    <SegmentedButtons
                        value={isBiclooAvailable}
                        onValueChange={setIsBiclooAvailable}
                        buttons={[
                            {
                                value: 'yes',
                                label: 'Oui',
                            },
                            {
                                value: 'no',
                                label: 'Non',
                            },
                        ]}
                    />
                </DrawerContentItem>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Drawer.Section 
                    showDivider={false}
                    style={styles.drawerContent} 
                    children={<DrawerContent/>}>
                </Drawer.Section>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1e1e1e",
        color:"white"
    },
    drawerContentTitle:{
        color: "white",
        fontSize: 30,
        textAlign: "center",
        padding: 20,
        width:"100%"
    },
    drawerContent:{
        width: "100%",
    },
    drawerItemTitle: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        width: "90%",
        marginVertical: 30,
    }
});

export default SearchDrawerContent;