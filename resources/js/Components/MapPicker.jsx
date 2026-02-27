import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const BUTUAN_CENTER = [8.9475, 125.5406];

function LocationMarker({ position, onPositionChange }) {
    useMapEvents({
        click(e) {
            onPositionChange(e.latlng.lat, e.latlng.lng);
        },
    });

    return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ latitude, longitude, onLocationChange }) {
    const [position, setPosition] = useState(
        latitude && longitude ? [parseFloat(latitude), parseFloat(longitude)] : null
    );

    useEffect(() => {
        if (latitude && longitude) {
            setPosition([parseFloat(latitude), parseFloat(longitude)]);
        }
    }, [latitude, longitude]);

    const handlePositionChange = (lat, lng) => {
        setPosition([lat, lng]);
        onLocationChange(lat, lng);
    };

    const handleClear = () => {
        setPosition(null);
        onLocationChange(null, null);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-cork-700">
                    Click the map to pin the location
                </span>
                {position && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                        Clear pin
                    </button>
                )}
            </div>
            <div className="overflow-hidden rounded-lg border-2 border-cork-300" style={{ height: '250px' }}>
                <MapContainer
                    center={position || BUTUAN_CENTER}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker
                        position={position}
                        onPositionChange={handlePositionChange}
                    />
                </MapContainer>
            </div>
            {position && (
                <p className="mt-1.5 text-xs text-cork-500">
                    Coordinates: {position[0].toFixed(5)}, {position[1].toFixed(5)}
                </p>
            )}
        </div>
    );
}
