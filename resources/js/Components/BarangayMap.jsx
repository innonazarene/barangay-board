import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Butuan City center coordinates
const BUTUAN_CENTER = [8.9475, 125.5406];
const DEFAULT_ZOOM = 13;

export default function BarangayMap({ posts = [], className = '', height = '300px', singlePost = false }) {
    const postsWithLocation = posts.filter(
        (p) => p.latitude && p.longitude
    );

    // If single post mode and has location, center on that post
    const center = singlePost && postsWithLocation.length === 1
        ? [parseFloat(postsWithLocation[0].latitude), parseFloat(postsWithLocation[0].longitude)]
        : BUTUAN_CENTER;

    const zoom = singlePost ? 15 : DEFAULT_ZOOM;

    return (
        <div className={className} style={{ height }}>
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {postsWithLocation.map((post) => (
                    <Marker
                        key={post.id}
                        position={[parseFloat(post.latitude), parseFloat(post.longitude)]}
                    >
                        <Popup>
                            <div className="text-sm max-w-[200px]">
                                {post.image && (
                                    <img
                                        src={`/storage/${post.image}`}
                                        alt={post.title}
                                        className="w-full h-24 object-cover rounded mb-2"
                                    />
                                )}
                                <strong className="block">{post.title}</strong>
                                {post.barangay?.name && (
                                    <p className="text-gray-500 text-xs mt-1">{post.barangay.name}</p>
                                )}
                                {post.location && (
                                    <p className="text-gray-400 text-xs">{post.location}</p>
                                )}
                                {!singlePost && (
                                    <a
                                        href={`/posts/${post.id}`}
                                        className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                                    >
                                        View post
                                    </a>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
