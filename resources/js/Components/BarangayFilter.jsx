export default function BarangayFilter({ barangays, selectedBarangay, onChange }) {
    const handleChange = (e) => {
        const value = e.target.value;
        onChange(value === '' ? null : Number(value));
    };

    return (
        <div className="flex items-center gap-2">
            <label
                htmlFor="barangay-filter"
                className="shrink-0 text-sm font-medium text-gray-700"
            >
                Barangay:
            </label>
            <select
                id="barangay-filter"
                value={selectedBarangay ?? ''}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:w-56"
            >
                <option value="">All Butuan City</option>
                {Array.isArray(barangays) &&
                    barangays.map((barangay) => (
                        <option key={barangay.id} value={barangay.id}>
                            {barangay.name}
                        </option>
                    ))}
            </select>
        </div>
    );
}
