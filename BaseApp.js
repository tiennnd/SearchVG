import {
    StackNavigator,
} from 'react-navigation';
import App from "./App";
import Details from "./src/components/Details";
import {MainComponent, DetailsComponent} from './src/constants';

export default BasicApp = StackNavigator({
    MainComponent: {
        screen: App,
        navigationOptions: {
            headerTitle: 'Search'
        }
    },
    DetailsComponent: {
        screen: Details,
        navigationOptions: {
            headerTitle: 'Details'
        }
    },
});