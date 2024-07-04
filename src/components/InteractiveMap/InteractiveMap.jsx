import React from 'react';
import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import { Flame } from 'lucide-react';
import { fireData } from '../../data/fakeDataToTest';
import './InteractiveMap.scss';

const InteractiveMap = () => {
    const dataToDisplay = fireData.map((fire, index) => ({
        key: fire.acq_date + index, 
        location: {
            lat: fire.latitude,
            lng: fire.longitude,
        },
        info: `Fire detected on ${fire.acq_date} at ${fire.acq_time}`
    }));

    const apiKey = import.meta.env.VITE_API_KEY;
    const mapID = import.meta.env.VITE_MAP_ID;

    const [selectedMarker, setSelectedMarker] = useState(null);

    return (
        <APIProvider apiKey={apiKey}>
            <div className="map" style={{height: "60vh", width: "80vw"}}>
                <Map
                    defaultCenter={{ lat: 22.54992, lng: 0 }}
                    defaultZoom={3}
                    mapId={mapID}
                >
                    {dataToDisplay.map((fire, index) => (
                        <React.Fragment key={fire.key}>
                            <AdvancedMarker
                                position={fire.location}
                                onClick={() => setSelectedMarker(index)}
                            >
                                <Flame size={16} color="#e41111" strokeWidth={3} absoluteStrokeWidth />
                            </AdvancedMarker>
                            {selectedMarker === index && (
                                <InfoWindow
                                    position={fire.location}
                                    onCloseClick={() => setSelectedMarker(null)}
                                >
                                    <p>{fire.info}</p>
                                </InfoWindow>
                            )}
                        </React.Fragment>
                    ))}
                </Map>
            </div>
        </APIProvider>
    );
};

export default InteractiveMap;
