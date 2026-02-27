import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Register() {
    const { barangays } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        barangay_id: '',
        address: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const inputClasses = "mt-1 block w-full !border-cork-300 !bg-paper-50 focus:!border-green-500 focus:!ring-green-500";

    return (
        <GuestLayout>
            <Head title="Register" />

            <h2 className="mb-4 text-center text-lg font-bold text-cork-800 font-handwriting tracking-wide">
                Join the Community!
            </h2>

            <form onSubmit={submit}>
                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" className="!text-cork-700 font-semibold" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={inputClasses}
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" className="!text-cork-700 font-semibold" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={inputClasses}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Barangay */}
                <div className="mt-4">
                    <InputLabel htmlFor="barangay_id" value="Barangay" className="!text-cork-700 font-semibold" />

                    <select
                        id="barangay_id"
                        name="barangay_id"
                        value={data.barangay_id}
                        onChange={(e) => setData('barangay_id', e.target.value)}
                        className="mt-1 block w-full rounded-lg border-cork-300 bg-paper-50 py-2 pl-3 pr-8 text-sm text-cork-800 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                        required
                    >
                        <option value="" disabled>
                            Select your barangay
                        </option>
                        {Array.isArray(barangays) &&
                            barangays.map((barangay) => (
                                <option key={barangay.id} value={barangay.id}>
                                    {barangay.name}
                                </option>
                            ))}
                    </select>

                    <InputError message={errors.barangay_id} className="mt-2" />
                </div>

                {/* Address */}
                <div className="mt-4">
                    <InputLabel htmlFor="address" value="Address" className="!text-cork-700 font-semibold" />

                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className={inputClasses}
                        autoComplete="street-address"
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="House no., street, purok, sitio..."
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="!text-cork-700 font-semibold" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={inputClasses}
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="!text-cork-700 font-semibold"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={inputClasses}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-cork-600 underline hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="!bg-green-600 hover:!bg-green-700 !shadow-paper" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
