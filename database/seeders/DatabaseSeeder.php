<?php

namespace Database\Seeders;

use App\Enums\PostCategory;
use App\Enums\PostStatus;
use App\Enums\UserRole;
use App\Models\Barangay;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * All 86 official barangays of Butuan City.
     */
    private array $barangayNames = [
        'Ambago',
        'Amparo',
        'Ampayon',
        'Anticala',
        'Antongalon',
        'Aupagan',
        'Baan KM 3',
        'Baan Riverside',
        'Babag',
        'Bading',
        'Bancasi',
        'Banza',
        'Baobaoan',
        'Bay-ang',
        'Bilay',
        'Bit-os',
        'Bitan-agan',
        'Bonbon',
        'Bugsukan',
        'Buhangin',
        'Cabcabon',
        'Camayahan',
        'Dagohoy (Pob.)',
        'De Gracia',
        'Doongan',
        'Dulag',
        'Dumalagan',
        'Florida',
        'Golden Ribbon',
        'Holy Redeemer (Pob.)',
        'Humabon (Pob.)',
        'Imadejas (Pob.)',
        'Jose Rizal (Pob.)',
        'Kinamlutan',
        'Lajanosa (Pob.)',
        'Langihan',
        'Lemon',
        'Leon Kilat (Pob.)',
        'Libertad',
        'Limaha (Pob.)',
        'Los Angeles',
        'Lumbocan',
        'Mahay',
        'Mahogany',
        'Maibu',
        'Mandamo',
        'Manila de Bugabus',
        'Maon (Pob.)',
        'Masao',
        'Maug',
        'MJ Santos',
        'New Society Village',
        'Nong-nong',
        'Obrero (Pob.)',
        'Ong Yiu (Pob.)',
        'Pagatpatan',
        'Pangabugan',
        'Pianing',
        'Pigdaulan',
        'Pinamanculan',
        'Port Poyohon',
        'Rajah Soliman (Pob.)',
        'San Ignacio (Pob.)',
        'San Mateo',
        'San Vicente',
        'Sikatuna (Pob.)',
        'Silongan',
        'Sumile',
        'Sumilihon',
        'Tagabaca',
        'Taguibo',
        'Taligaman',
        'Tiniwisan',
        'Tungao',
        'Villa Kananga',
    ];

    public function run(): void
    {
        // -------------------------------------------------------------------------
        // 1. Seed all 86 barangays
        // -------------------------------------------------------------------------
        $barangays = collect($this->barangayNames)->map(
            fn(string $name) => Barangay::create(['name' => $name])
        );

        // -------------------------------------------------------------------------
        // 2. Users
        // -------------------------------------------------------------------------

        // 2a. Super admin — no barangay affiliation
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@butuan.test',
            'password' => Hash::make('password'),
            'role' => UserRole::Admin,
            'barangay_id' => null,
            'address' => 'Butuan City Hall, Montilla Blvd, Butuan City',
        ]);

        // 2b. One admin per first 5 barangays
        $firstFiveBarangays = $barangays->take(5);

        $barangayAdmins = $firstFiveBarangays->map(function (Barangay $barangay) {
            $slug = Str::slug($barangay->name);

            return User::create([
                'name' => 'Admin ' . $barangay->name,
                'email' => "admin-{$slug}@barangay.test",
                'password' => Hash::make('password'),
                'role' => UserRole::Admin,
                'barangay_id' => $barangay->id,
                'address' => 'Barangay Hall, ' . $barangay->name . ', Butuan City',
            ]);
        });

        // 2c. 10 resident users spread across different barangays
        $residentData = [
            [
                'name' => 'Maria Santos',
                'email' => 'maria.santos@resident.test',
                'address' => 'Purok 3, Ambago, Butuan City',
                'barangay_index' => 0, // Ambago
            ],
            [
                'name' => 'Juan dela Cruz',
                'email' => 'juan.delacruz@resident.test',
                'address' => 'Purok 5, Ampayon, Butuan City',
                'barangay_index' => 2, // Ampayon
            ],
            [
                'name' => 'Nelia Reyes',
                'email' => 'nelia.reyes@resident.test',
                'address' => 'Purok 1, Baan Riverside, Butuan City',
                'barangay_index' => 7, // Baan Riverside
            ],
            [
                'name' => 'Rolando Macaraeg',
                'email' => 'rolando.macaraeg@resident.test',
                'address' => 'Purok 7, Bading, Butuan City',
                'barangay_index' => 9, // Bading
            ],
            [
                'name' => 'Lourdes Villanueva',
                'email' => 'lourdes.villanueva@resident.test',
                'address' => 'Purok 2, Libertad, Butuan City',
                'barangay_index' => 38, // Libertad
            ],
            [
                'name' => 'Emmanuel Torralba',
                'email' => 'emmanuel.torralba@resident.test',
                'address' => 'Purok 4, Lumbocan, Butuan City',
                'barangay_index' => 41, // Lumbocan
            ],
            [
                'name' => 'Corazon Abad',
                'email' => 'corazon.abad@resident.test',
                'address' => 'Purok 6, Dagohoy, Butuan City',
                'barangay_index' => 22, // Dagohoy (Pob.)
            ],
            [
                'name' => 'Dante Espinosa',
                'email' => 'dante.espinosa@resident.test',
                'address' => 'Purok 1, Taligaman, Butuan City',
                'barangay_index' => 71, // Taligaman
            ],
            [
                'name' => 'Rosario Padilla',
                'email' => 'rosario.padilla@resident.test',
                'address' => 'Purok 3, Masao, Butuan City',
                'barangay_index' => 48, // Masao
            ],
            [
                'name' => 'Genaro Fuentes',
                'email' => 'genaro.fuentes@resident.test',
                'address' => 'Purok 8, Tungao, Butuan City',
                'barangay_index' => 73, // Tungao
            ],
        ];

        $residents = collect($residentData)->map(function (array $data) use ($barangays) {
            return User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'role' => UserRole::Resident,
                'barangay_id' => $barangays->get($data['barangay_index'])->id,
                'address' => $data['address'],
            ]);
        });

        // All non-super-admin users for assigning comments and votes
        $allRegularUsers = $barangayAdmins->merge($residents);

        // -------------------------------------------------------------------------
        // 3. Sample posts (30 posts with realistic Butuan/Filipino scenarios)
        // -------------------------------------------------------------------------

        // Helper: get barangay by name
        $brgy = fn(string $name) => $barangays->firstWhere('name', $name);

        // Helper: get resident by name
        $resident = fn(string $name) => $residents->firstWhere('name', $name);

        $postsData = [
            // --- ISSUES -------------------------------------------------------
            [
                'user' => $resident('Juan dela Cruz'),
                'barangay' => $brgy('Ampayon'),
                'title' => 'Baha sa Purok 5, Ampayon — Dinaloy na ang Dalan',
                'body' => 'Mga kapurok, nagbaha pud sab karong buntaga dito sa Purok 5 Ampayon. Grabi kaayo ang tubig sa kalsada — hapit na makaabot sa sulod sa balay. Ang drainage diri dugay nang sirado, mao na tingali hinungdan. Ginahangyoon ang barangay nga sulbaron na kini. Pila na ka beses ang nakareklamo pero wala pay aksyon. Kailangan na gyud og emergency cleaning sa drainage system.',
                'category' => PostCategory::Issue,
                'status' => PostStatus::Open,
                'location' => 'Purok 5, Ampayon, Butuan City',
                'is_pinned' => true,
            ],
            [
                'user' => $resident('Rolando Macaraeg'),
                'barangay' => $brgy('Bading'),
                'title' => 'Sirang Poste ng Ilaw sa Purok 7, Bading',
                'body' => 'Gusto ko lang po i-report na ang poste ng ilaw dito sa harap ng Purok 7 Bading ay sira na ng dalawang linggo. Madilim na sa gabi at delikado na para sa mga residente, lalo na sa mga nagbabalik ng gabi mula trabaho. May mga bata ring naglalaro doon. Sana ayusin na po agad bago pa may maaksidente.',
                'category' => PostCategory::Issue,
                'status' => PostStatus::InProgress,
                'location' => 'Purok 7, Bading, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Lourdes Villanueva'),
                'barangay' => $brgy('Libertad'),
                'title' => 'Illegal Dumping sa Creek ng Libertad',
                'body' => 'Naa koy nakita nga mga indibidwal nga nagsalog og basura sa creek sa Libertad, duol sa Purok 2. Dugay na nilang gihimo kini — naay dako nga bunton sa mga plastik ug uban pang basura. Ang baho lagsik na kaayo, ug nabalaka ko nga moresulta kini og baha o sakit sa komunidad. Nahinongdan na sa kagamhanang barangay, palihog aksyon na.',
                'category' => PostCategory::Issue,
                'status' => PostStatus::Open,
                'location' => 'Creek, Purok 2, Libertad, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Emmanuel Torralba'),
                'barangay' => $brgy('Lumbocan'),
                'title' => 'Butas na Kalsada sa Lumbocan — Delikado sa Motorsiklo',
                'body' => 'May malaking butas sa kalsada sa Lumbocan malapit sa Purok 4 na papalayo sa market. Ilang beses na may nag-angkas na motor ang dumaan doon at halos matumba. Lalo na kapag gabi at walang ilaw, hindi makita ng mga motorista. Nagsumite na kami ng reklamo sa tanggapan ng barangay ngunit wala pang sumasagot. Pakiusap na po ayusin na.',
                'category' => PostCategory::Issue,
                'status' => PostStatus::Resolved,
                'location' => 'Purok 4, Lumbocan, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Genaro Fuentes'),
                'barangay' => $brgy('Tungao'),
                'title' => 'Grabe ang Baho sa Sementeryo sa Tungao — Basura di na Nakuha',
                'body' => 'Mga kababayang taga-Tungao, sulat-reklamo na pud ko bahin sa basura sa sementeryo namo. Duha na ka semana nga wala nakolekta ang basura, puro na plastik ug nabuluk na pagkaon atong nakita sa palibot. Ang mga bata dili na makadula sa gawas tungod sa baho. Palihog tubaga ang reklamo sa mga residente.',
                'category' => PostCategory::Issue,
                'status' => PostStatus::Open,
                'location' => 'Sementeryo, Tungao, Butuan City',
                'is_pinned' => false,
            ],

            // --- ANNOUNCEMENTS -----------------------------------------------
            [
                'user' => $barangayAdmins->get(3), // Admin Bading
                'barangay' => $brgy('Bading'),
                'title' => 'Libre Tuli sa Barangay Health Center ng Bading — Hulyo 15',
                'body' => 'Ipaalam sa lahat ng residente ng Barangay Bading na magkakaroon ng LIBRENG TULI sa ating Barangay Health Center sa Hulyo 15, 2026, mula alas-7 ng umaga hanggang alas-3 ng hapon. Para sa mga lalaki na 5 hanggang 15 taong gulang. Magdala ng PhilHealth ID o barangay ID. Para sa impormasyon tumawag sa Barangay Health Center sa 085-342-xxxx.',
                'category' => PostCategory::Announcement,
                'status' => PostStatus::Open,
                'location' => 'Barangay Health Center, Bading, Butuan City',
                'is_pinned' => true,
            ],
            [
                'user' => $barangayAdmins->get(4), // Admin Bancasi
                'barangay' => $brgy('Bancasi'),
                'title' => 'Brownout Schedule sa Libertad ug Kasilinganon — Marso 5',
                'body' => 'Anunsyo gikan sa AKELCO: Magkaon og brownout ang mga mosunod nga barangay sa Marso 5, 2026 gikan alas-8 sa buntag hangtud alas-5 sa hapon: Libertad, Bancasi, Langihan, ug uban pang kasilinganon. Kini tungod sa pinlano nga paghiusa sa linya. Pasensya na sa inconvenience. Para sa mga negosyo, i-prepare na ang generator.',
                'category' => PostCategory::Announcement,
                'status' => PostStatus::Open,
                'location' => 'Libertad, Bancasi, Langihan, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $barangayAdmins->get(0), // Admin Ambago
                'barangay' => $brgy('Ambago'),
                'title' => 'Curfew Reminder para sa mga Kabataan sa Ambago',
                'body' => 'Ipinaaalam ng Barangay Ambago na ang curfew para sa mga minoridad (18 pababa) ay mula alas-10 ng gabi hanggang alas-5 ng umaga. Pakiusap sa mga magulang na bantayan ang inyong mga anak. Ang mga makikitang menor de edad sa labas ng kanilang tahanan pagkatapos ng curfew ay dadalhín sa barangay hall. Maaari silang kupkupin ng kanilang magulang sa susunod na umaga. Sama-sama nating pangalagaan ang kaligtasan ng ating mga kabataan.',
                'category' => PostCategory::Announcement,
                'status' => PostStatus::Open,
                'location' => 'Ambago, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $barangayAdmins->get(1), // Admin Amparo
                'barangay' => $brgy('Amparo'),
                'title' => 'Pagpaparehistro ng mga Pangisdaan sa Barangay Amparo',
                'body' => 'Sa lahat ng mangingisda sa Barangay Amparo: ang pagpaparehistro ng inyong bangka at kagamitan sa pangingisda ay gaganapin sa Barangay Hall mula Marso 10–20, 2026. Dalhin ang mga sumusunod: 2x2 na larawan, barangay ID, at mga dokumento ng bangka. Ang hindi magparehistro bago mag-Abril 1 ay maaaring magkaroon ng multa. Para sa karagdagang impormasyon bumisita sa aming barangay hall.',
                'category' => PostCategory::Announcement,
                'status' => PostStatus::Open,
                'location' => 'Barangay Hall, Amparo, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $barangayAdmins->get(2), // Admin Ampayon
                'barangay' => $brgy('Ampayon'),
                'title' => '4Ps Beneficiaries — Listahan ng Bagong Cycle sa Ampayon',
                'body' => 'Ang mga bagong beneficiary ng Pantawid Pamilyang Pilipino Program (4Ps) sa Ampayon ay maaaring pumunta sa barangay hall para sa verification ng listahan. Dalhin ang inyong DSWD documents, birth certificates ng mga anak, at valid ID. Ang verification ay mula Marso 8–12, 2026. Huwag palampasin ang pagkakataong ito. Para sa mga tanong makipag-ugnayan sa aming social welfare officer.',
                'category' => PostCategory::Announcement,
                'status' => PostStatus::Open,
                'location' => 'Barangay Hall, Ampayon, Butuan City',
                'is_pinned' => false,
            ],

            // --- EVENTS -------------------------------------------------------
            [
                'user' => $resident('Corazon Abad'),
                'barangay' => $brgy('Dagohoy (Pob.)'),
                'title' => 'Basketball League sa Dagohoy Covered Court — Abril 2026',
                'body' => 'Imbitahan ang tanan nga lalaki (18+ anyos) nga mosali sa Basketball League sa Dagohoy Covered Court! Ang liga magsugod sa Abril 5, 2026 ug magpadayon matag Sabado ug Domingo. Ang registration fee kay P500 per team (5 players minimum). May premyo ang Top 3 teams! Para sa registration moadto sa Barangay Hall sa Dagohoy o makipagtalk kang Kagawad Reyes. Deadline: Marso 30.',
                'category' => PostCategory::Event,
                'status' => PostStatus::Open,
                'location' => 'Dagohoy Covered Court, Dagohoy (Pob.), Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $barangayAdmins->get(3), // Admin Bading
                'barangay' => $brgy('Bading'),
                'title' => 'Barangay Clean-Up Drive sa Lumbocan — Sabado, Marso 8',
                'body' => 'Makiisa sa aming Barangay Clean-Up Drive sa Lumbocan! Itatapos namin ang general cleaning ng aming komunidad sa Sabado, Marso 8, 2026 mula alas-6 ng umaga hanggang tanghali. Mag-assemble sa Lumbocan Barangay Hall. Magdala ng sariling walis, de-gulong, at basurahan. Ang barangay ay magbibigay ng gloves at garbage bags. May libreng almusal para sa lahat ng lalahok. Sama-sama para sa malinis na Lumbocan!',
                'category' => PostCategory::Event,
                'status' => PostStatus::Open,
                'location' => 'Lumbocan Barangay Hall, Lumbocan, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Maria Santos'),
                'barangay' => $brgy('Ambago'),
                'title' => 'Fiesta sa Ambago — Marso 19, 2026',
                'body' => 'Imbitahan ang lahat na dumalo sa aming taunang Fiesta ng Barangay Ambago sa Marso 19, 2026! Magsisimula ang programa sa alas-8 ng umaga sa Barangay Plaza. Kasama ang: Simbahan misas, cultural show, streetdance competition, at noche buena. Para sa mga gustong magbenta ng pagkain sa fiesta market, makipag-ugnayan sa Barangay Hall bago Marso 15. Lahat ay welcome — libre ang pagpasok!',
                'category' => PostCategory::Event,
                'status' => PostStatus::Open,
                'location' => 'Barangay Plaza, Ambago, Butuan City',
                'is_pinned' => true,
            ],
            [
                'user' => $barangayAdmins->get(0), // Admin Ambago
                'barangay' => $brgy('Ambago'),
                'title' => 'Free Medical Mission sa Masao — Marso 22, 2026',
                'body' => 'Ang Barangay Masao, kasama ang Butuan City Health Office, ay magsasagawa ng Libreng Medical Mission sa Marso 22, 2026, alas-7 ng umaga hanggang alas-4 ng hapon sa Masao Barangay Plaza. Serbisyo: general check-up, blood pressure monitoring, dental extraction, libreng gamot, at eye check-up. Dalhin ang PhilHealth card o barangay ID. Prioritized ang mga matatanda at buntis.',
                'category' => PostCategory::Event,
                'status' => PostStatus::Open,
                'location' => 'Masao Barangay Plaza, Masao, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Dante Espinosa'),
                'barangay' => $brgy('Taligaman'),
                'title' => 'Livelihood Training: Basic Tilapia Fish Farming sa Taligaman',
                'body' => 'Magkakaroon ng libreng livelihood training sa basic tilapia fish farming sa Taligaman Community Hall sa Abril 10–12, 2026. Pinagsama-sama ng BFAR at lokal na barangay. Libre ang training kasama ang pagkain. Magsimula sa alas-8 ng umaga. Para sa pag-register makipag-ugnayan kay Brgy. Kagawad Santos o pumunta sa Taligaman Barangay Hall bago Abril 5. Limitadong slots lamang — 30 participants.',
                'category' => PostCategory::Event,
                'status' => PostStatus::Open,
                'location' => 'Taligaman Community Hall, Taligaman, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Nelia Reyes'),
                'barangay' => $brgy('Baan Riverside'),
                'title' => 'Brigada Eskwela 2026 — Baan Riverside Elementary School',
                'body' => 'Imbitahan ang lahat ng magulang at mga residente ng Baan Riverside na sumali sa Brigada Eskwela 2026 sa Baan Riverside Elementary School. Magsisimula ang gawain sa Marso 25, 2026, alas-7 ng umaga. Kailangan ng tulong para sa pagpipinta, paglilinis ng klase, at pag-aayos ng mga palikuran. Magdala ng sariling painting materials kung mayroon. Tinatanggap din ang mga donasyon ng school supplies.',
                'category' => PostCategory::Event,
                'status' => PostStatus::Open,
                'location' => 'Baan Riverside Elementary School, Baan Riverside, Butuan City',
                'is_pinned' => false,
            ],

            // --- LOST AND FOUND -----------------------------------------------
            [
                'user' => $resident('Juan dela Cruz'),
                'barangay' => $brgy('Ampayon'),
                'title' => 'Nawawalang Aspin sa Ampayon — Brownish, May Puting Kwelyo',
                'body' => 'Nawala ang aming aspin na si "Bantay" sa Ampayon area noong Marso 3, 2026. Lalaki, mga 2 taong gulang, kayumanggi ang balahibo na may puting patsa sa dibdib. Suot ang puting kwelyo na may pangalan. Kung may nakakita, pakiusap makipag-ugnayan sa 0917-xxx-xxxx (Juan). Mayroon kaming reward para sa sinumang makabalik sa aming aso. Maaaring kasama rin siya sa Purok 3 o 4 area ng Ampayon.',
                'category' => PostCategory::LostAndFound,
                'status' => PostStatus::Open,
                'location' => 'Purok 3–4, Ampayon, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Rosario Padilla'),
                'barangay' => $brgy('Masao'),
                'title' => 'Nakit-an: Wallet sa Masao Port Area',
                'body' => 'Nakit-an namo og wallet didto sa Masao Port Area kagahapon, Marso 4, 2026 mga alas-3 sa hapon. Sulod niini ang mga card ug pipila ka piso. Kung imo kining wallet, pakipamolong namo ug ihulagway ang sulod sa wallet aron mapamatuod. Makita ko sa 0918-xxx-xxxx (Rosario). Dili ko i-disclose ang sulod sa wallet sa publiko para sa seguridad sa tag-iya.',
                'category' => PostCategory::LostAndFound,
                'status' => PostStatus::Resolved,
                'location' => 'Masao Port Area, Masao, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Maria Santos'),
                'barangay' => $brgy('Ambago'),
                'title' => 'Nawala: Samsung Phone sa Ambago Market',
                'body' => 'Nawala ang aking Samsung Galaxy A34 na kulay itim sa Ambago Market noong Marso 2, 2026 mga tanghali. May screen protector at black case. Kung may nakahanap, pakiusap ibalik — mahalaga ang data na narito. Makipag-ugnayan sa 0916-xxx-xxxx o pumunta sa Purok 3, Ambago. May reward na P500 para sa mabuting Samaritano. Sana may matulungan sa atin dito sa komunidad.',
                'category' => PostCategory::LostAndFound,
                'status' => PostStatus::Open,
                'location' => 'Ambago Market, Ambago, Butuan City',
                'is_pinned' => false,
            ],

            // --- HELP REQUESTS ------------------------------------------------
            [
                'user' => $resident('Lourdes Villanueva'),
                'barangay' => $brgy('Libertad'),
                'title' => 'Naghahanap ng Libreng Tutor para sa Aking Anak sa Libertad',
                'body' => 'Magandang araw sa lahat! Naghahanap po ako ng libreng tutor para sa aking anak na nasa Grade 5 na nahihirapan sa Math at English. Kami ay nasa Purok 2, Libertad. Hindi ko po kayang bayaran ang bayad ngunit handa akong mag-alok ng kapalit na serbisyo tulad ng pagluluto, paglalaba, o pag-aalaga ng anak sa mga oras ng pagtuturo. Kung may gustong tumulong, matawagan po ako sa 0915-xxx-xxxx. Salamat sa inyo.',
                'category' => PostCategory::HelpRequest,
                'status' => PostStatus::Open,
                'location' => 'Purok 2, Libertad, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Dante Espinosa'),
                'barangay' => $brgy('Taligaman'),
                'title' => 'Nagkinahanglan og Tabang — Naigo sa Sunog ang Balay sa Taligaman',
                'body' => 'Mga kababayan, nagkinahanglan kami og tabang. Naigo ang among balay sa sunog kagabii, Marso 3, 2026, mga alas-11 sa gabii. Wala kaming natanggap nga bisan unsa — natunaw ang tanan. Kami karon nagpuyo sa balay sa among silingan. Nagkinahanglan kami og: lumang sinina (adults), pagkaon, ug bisan unsang butang nga makatabang. Ang inyong tabang makahatag og dako nga kahulogan. Daghang salamat.',
                'category' => PostCategory::HelpRequest,
                'status' => PostStatus::InProgress,
                'location' => 'Purok 8, Taligaman, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Genaro Fuentes'),
                'barangay' => $brgy('Tungao'),
                'title' => 'Humingi ng Tulong: Pagkain para sa Senior Citizens sa Tungao',
                'body' => 'Nais ko pong ibahagi na maraming senior citizens sa aming barangay Tungao ang nangangailangan ng pagkain, lalo na ngayong panahon ng tag-ulan. Ang ilan sa kanila ay nakatira nang mag-isa at walang hanapbuhay. Kung may gustong magdonate ng pagkain o basta cash, ipapadala namin ito nang direkta sa mga benepisyaryo. Makipag-ugnayan sa akin sa 0919-xxx-xxxx. Kahit maliit na tulong malaking bagay para sa kanila.',
                'category' => PostCategory::HelpRequest,
                'status' => PostStatus::Open,
                'location' => 'Tungao, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Nelia Reyes'),
                'barangay' => $brgy('Baan Riverside'),
                'title' => 'Naghahanap ng Libreng Sakay Papuntang Ospital — Baan Riverside',
                'body' => 'Magandang umaga po. Naghahanap po kami ng sinumang may sasakyan na maaaring magsundo sa aking ina na may sakit papunta sa ANDMC (Agusan del Norte District Medical Center) bukas ng umaga, mga alas-6. Nakatira kami sa Purok 1, Baan Riverside. Mahirap pong mag-habal-habal dahil mabigat ang kondisyon ni Nanay. Kung may makakatulong, lubos na nagpapasalamat. Makipag-ugnayan sa 0917-xxx-xxxx (Nelia).',
                'category' => PostCategory::HelpRequest,
                'status' => PostStatus::Resolved,
                'location' => 'Purok 1, Baan Riverside, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Rolando Macaraeg'),
                'barangay' => $brgy('Bading'),
                'title' => 'Naghahanap ng Trabaho — Electrician sa Bading Area',
                'body' => 'Magandang araw po sa lahat. Ako po si Rolando, licensed electrician na nakatira sa Purok 7 Bading. Naghahanap po ako ng trabaho bilang electrician sa lokal na negosyo o construction. Mayroon akong 5 taong karanasan sa residential at commercial wiring. May sarili akong mga kagamitan. Kung may nangangailangan ng serbisyo o makakaalam ng bakanteng trabaho, pakiusap makipag-ugnayan sa akin. Maraming salamat sa tulong ng komunidad.',
                'category' => PostCategory::HelpRequest,
                'status' => PostStatus::Open,
                'location' => 'Purok 7, Bading, Butuan City',
                'is_pinned' => false,
            ],

            // --- MORE MIXED ---------------------------------------------------
            [
                'user' => $resident('Corazon Abad'),
                'barangay' => $brgy('Dagohoy (Pob.)'),
                'title' => 'Reklamo: Videoke Grabe Kaayo ang Loudness sa Dagohoy — Wala na Mahimutang Silingan',
                'body' => 'Mga silingan sa Dagohoy, gusto ko lang i-raise ang isyu bahin sa videoke sa kanto sa Purok 6. Hapit na alas-2 sa gabii ug nag-karaoke gihapon sila. Daghang residente ang nag-reklamo na dili na sila makatulog. May mga bata ug tigulang nga apektado. Ang anti-noise ordinance ba sa Butuan City kay wala na nagsilbi? Naghinabot na sa barangay tanod pero walay aksyon. Palihog pakibanan kini.',
                'category' => PostCategory::Issue,
                'status' => PostStatus::Open,
                'location' => 'Purok 6, Dagohoy (Pob.), Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Emmanuel Torralba'),
                'barangay' => $brgy('Lumbocan'),
                'title' => 'Nagbebenta ng Homemade Pasta at Bibingka — Lumbocan',
                'body' => 'Magandang araw sa lahat ng ka-Lumbocan! Nagsimula na akong gumawa ng homemade pasta at bibingka para ibenta. Puwede mag-order in advance para sa handaan, birthday, o basta personal na pagkain. Mayroon akong carbonara, pesto, at tomato-based pasta. Ang bibingka ay tradisyonal na rice cake na lasang lutong bahay. Para sa presyo at order maaaring makipag-ugnayan sa 0916-xxx-xxxx. Delivery available sa loob ng Lumbocan.',
                'category' => PostCategory::Announcement,
                'status' => PostStatus::Open,
                'location' => 'Purok 4, Lumbocan, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $barangayAdmins->get(1), // Admin Amparo
                'barangay' => $brgy('Amparo'),
                'title' => 'Nawawalang Bata sa Amparo — 7 anyos, Purok 3',
                'body' => 'EMERGENCY: Nawawala si Dodong Santos, 7 taong gulang, lalaki, suot ang asul na t-shirt at pulang shorts. Nawala sa Purok 3 Amparo noong hapon ng Marso 4, 2026. Maitim ang buhok, manipis ang katawan, mga 4 talampakan ang taas. Kung may nakakita niya, pakiusap tawagan ang kanyang magulang sa 0918-xxx-xxxx o dalhín siya sa pinakamalapit na barangay tanod. Pakiusap ibahagi ito.',
                'category' => PostCategory::LostAndFound,
                'status' => PostStatus::Resolved,
                'location' => 'Purok 3, Amparo, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $barangayAdmins->get(4), // Admin Bancasi
                'barangay' => $brgy('Bancasi'),
                'title' => 'Dengue Alert sa Bancasi — Aksyon Karon Ginahangyo',
                'body' => 'HEALTH ALERT: Naay nareport nga mga kaso sa dengue sa Bancasi area. Ang barangay health center nagpaabot og warning sa tanan nga residente: Limpyohi ang inyong mga yarda ug tapok-tubig. Gamiton ang insect repellent, labi na sa kabata. Isulod ang mga basyo nga lata, bote, ug gulong. Kon naay lagnat sulod sa 3 ka adlaw, dali magpadoktor. Ang misting operation mahitabo sa Marso 6 — ilingon ang inyong mga silingan.',
                'category' => PostCategory::Announcement,
                'status' => PostStatus::Open,
                'location' => 'Bancasi, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Rosario Padilla'),
                'barangay' => $brgy('Masao'),
                'title' => 'Pasalamat — Nauli na ang Wallet! Salamat Taga-Masao',
                'body' => 'Gusto ko lang pasalamatan si ka-barangay nga nagbalik sa akong wallet nga nakit-an sa Masao Port. Dili ko ma-describe ang aking kagalakan nang nakita ko ulit ang aking mga mahalagang kard at pera. Ito ang nagpapatunay na may mabuting mga tao pa sa ating komunidad. Mabuhay ang Barangay Masao! Patuloy nating pangalagaan ang ating komunidad sa pamamagitan ng pagiging matapat at mabait sa isa\'t isa.',
                'category' => PostCategory::Announcement,
                'status' => PostStatus::Open,
                'location' => 'Masao, Butuan City',
                'is_pinned' => false,
            ],
            [
                'user' => $resident('Maria Santos'),
                'barangay' => $brgy('Ambago'),
                'title' => 'Libreng Seedlings para sa mga Gustong Mag-Halaman — Ambago',
                'body' => 'Kamusta mga kababayan sa Ambago! Nagbibigay ako ng libreng seedlings para sa mga gustong mag-tanim sa bahay — kamatis, sili, pechay, at sitaw. Nagtayo ako ng maliit na nursery sa aking bakuran at marami akong seedlings na handang ibigay. Isa sa aking misyon ang itaguyod ang food security sa ating barangay. Pumunta sa aking bahay sa Purok 3, Ambago o tawagan sa 0916-xxx-xxxx. First come, first served.',
                'category' => PostCategory::HelpRequest,
                'status' => PostStatus::Open,
                'location' => 'Purok 3, Ambago, Butuan City',
                'is_pinned' => false,
            ],
        ];

        $createdPosts = collect();

        foreach ($postsData as $postData) {
            // Generate random coordinates around Butuan City
            // Latitude: 8.90 to 9.00
            // Longitude: 125.48 to 125.58
            $lat = 8.90 + (mt_rand() / mt_getrandmax()) * 0.10;
            $lng = 125.48 + (mt_rand() / mt_getrandmax()) * 0.10;

            $post = Post::create([
                'user_id' => $postData['user']->id,
                'barangay_id' => $postData['barangay']->id,
                'title' => $postData['title'],
                'body' => $postData['body'],
                'category' => $postData['category'],
                'status' => $postData['status'],
                'location' => $postData['location'],
                'latitude' => $lat,
                'longitude' => $lng,
                'image' => null,
                'is_pinned' => $postData['is_pinned'],
            ]);

            $createdPosts->push($post);
        }

        // -------------------------------------------------------------------------
        // 4a. Comments — 2–5 per post from random users
        // -------------------------------------------------------------------------

        $commentPool = [
            // Sympathy / concern
            'Grabe kaayo ni, sana aksyonan na gyud dayon sa barangay!',
            'Nabalaka pud ko ani — daghan pamilya ang apektado dinhi sa among purok.',
            'Salamat sa pag-report. Magpadayon ta og pag-monitor ani nga sitwasyon.',
            'Mao gyud ni! Dugay na kaming nagreklamo pero walay sulusyon pa.',
            'Ingon man pud sa among purok. Sama-samang i-raise sa barangay assembly.',

            // Supportive / helpful
            'Makatabang ko! Makipag-ugnayan sa akin sa DM para sa detalye.',
            'Salamat sa impormasyon. Ibabahagi ko ito sa aming mga kapitbahay.',
            'Nandito kami para tumulong — komunidad tayo!',
            'Mayroon akong kakilala na maaaring tumulong dito. Ibabahagi ko.',
            'Ay salamat sa pagbabahagi! Importante ito para sa lahat nating residente.',

            // Updates / action
            'Nakipag-usap na ako sa tanod, sasaklawin na nila bukas.',
            'Natawagan ko na ang barangay hall — nagsabi silang darating sila.',
            'Nag-file na ako ng formal complaint sa City Engineering Office para dito.',
            'Ipapadala ko ang litrato sa barangay captain para direktang makita niya.',
            'Nagsimula na silang mag-ayos — nakita ko kanina ng hapon.',

            // Sharing info / confirming
            'Tama ka dyan — ganon na matagal na sa aming lugar. Malubha na.',
            'Nakakaalam pala ako na nag-report na rin ng iba dati, pero walang aksyon.',
            'Oo, naramdaman ko rin iyon. Laging bahaw ang tawag sa barangay hotline.',
            'Kumpirma — nakita ko pud ang sitwasyon. Sana matubos na kini.',
            'Naibahagi ko na ito sa aming grupo sa messenger. Maraming nag-react.',

            // Tagalog/Bisaya community responses
            'Grabe, nawala jud ang batang iyon? Nakakalungkot kaayo!',
            'Amping ta mga kapurok — labi na ang mga bata sa gabi.',
            'Daghang salamat sa pagbukas og impormasyon diri sa bulletin board.',
            'Sana mo-join ta tanan sa clean-up drive. Kailangan gyud natin ito.',
            'Ang barangay namo swerte kay may ganyang mga aktibidad para sa komunidad.',

            // Appreciation
            'Nagpapasalamat sa admin sa lahat ng ginagawa para sa aming barangay!',
            'Thank you sa pag-post. Makaka-alam ang lahat zahid sa aming komunidad.',
            'Mahalagang impormasyon ito — ibabahagi ko sa aking pamilya.',
            'Ang ganda ng programang ito para sa mga residente. Sana tuloy-tuloy!',
            'Wow, mabilis na mag-update ang aming barangay. Galing!',
        ];

        foreach ($createdPosts as $post) {
            $commentCount = rand(2, 5);
            // Pick unique commenters per post (avoid author commenting on own post unnecessarily)
            $commenters = $allRegularUsers
                ->filter(fn($u) => $u->id !== $post->user_id)
                ->shuffle()
                ->take($commentCount);

            foreach ($commenters as $commenter) {
                Comment::create([
                    'user_id' => $commenter->id,
                    'post_id' => $post->id,
                    'body' => $commentPool[array_rand($commentPool)],
                ]);
            }
        }

        // -------------------------------------------------------------------------
        // 4b. Votes — 3–10 per post, each user votes at most once per post
        // -------------------------------------------------------------------------

        foreach ($createdPosts as $post) {
            $voteCount = rand(3, 10);
            $voters = $allRegularUsers
                ->filter(fn($u) => $u->id !== $post->user_id)
                ->shuffle()
                ->take($voteCount);

            foreach ($voters as $voter) {
                Vote::create([
                    'user_id' => $voter->id,
                    'post_id' => $post->id,
                ]);
            }
        }
    }
}
