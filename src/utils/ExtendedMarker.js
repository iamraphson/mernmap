/**
 * Created by Raphson on 10/2/16.
 */
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
export default class ExtendedMarker extends Marker {
    // "Hijack" the component lifecycle.
    componentDidMount() {
        // Call the Marker class componentDidMount (to make sure everything behaves as normal)
        super.componentDidMount();

        // Access the marker element and open the popup.
        this.leafletElement.openPopup();
    }
}