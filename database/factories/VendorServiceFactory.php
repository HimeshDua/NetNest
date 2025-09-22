<?php

namespace Database\Factories;

use App\Models\VendorService;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class VendorServiceFactory extends Factory
{
  protected $model = VendorService::class;


  protected static array $pakistanAreas = [
    'Karachi' => [
      ['name' => 'Clifton', 'lat' => 24.809025, 'lng' => 67.034978],
      ['name' => 'DHA Phase 1-8', 'lat' => 24.806338, 'lng' => 67.033020],
      ['name' => 'Gulshan-e-Iqbal', 'lat' => 24.906012, 'lng' => 67.074413],
      ['name' => 'North Nazimabad', 'lat' => 24.928141, 'lng' => 67.030541],
      ['name' => 'Korangi', 'lat' => 24.870338, 'lng' => 67.113693],
      ['name' => 'PECHS', 'lat' => 24.872074, 'lng' => 67.082031],
      ['name' => 'Saddar', 'lat' => 24.860966, 'lng' => 67.018066],
      ['name' => 'Gulistan-e-Jauhar', 'lat' => 24.930000, 'lng' => 67.130000],
      ['name' => 'Malir', 'lat' => 24.900000, 'lng' => 67.200000],
      ['name' => 'Landhi', 'lat' => 24.840000, 'lng' => 67.150000],
      ['name' => 'Kemari', 'lat' => 24.850000, 'lng' => 66.980000],
      ['name' => 'Lyari', 'lat' => 24.860000, 'lng' => 67.010000],
      ['name' => 'Orangi Town', 'lat' => 24.950000, 'lng' => 67.000000],
      ['name' => 'New Karachi', 'lat' => 24.970000, 'lng' => 67.060000],
      ['name' => 'FB Area', 'lat' => 24.920000, 'lng' => 67.090000],
      ['name' => 'Gulshan-e-Maymar', 'lat' => 24.980000, 'lng' => 67.030000],
      ['name' => 'Bahadurabad', 'lat' => 24.880000, 'lng' => 67.060000],
      ['name' => 'Tariq Road', 'lat' => 24.870000, 'lng' => 67.070000],
      ['name' => 'Shah Faisal Colony', 'lat' => 24.890000, 'lng' => 67.170000],
      ['name' => 'Airport Area', 'lat' => 24.900000, 'lng' => 67.160000],
    ],

    'Lahore' => [
      ['name' => 'Gulberg', 'lat' => 31.520691, 'lng' => 74.358747],
      ['name' => 'DHA Phase 1-9', 'lat' => 31.470910, 'lng' => 74.340986],
      ['name' => 'Johar Town', 'lat' => 31.466483, 'lng' => 74.315018],
      ['name' => 'Model Town', 'lat' => 31.481545, 'lng' => 74.320278],
      ['name' => 'Shadman', 'lat' => 31.556045, 'lng' => 74.340797],
      ['name' => 'Township', 'lat' => 31.414004, 'lng' => 74.255287],
      ['name' => 'Allama Iqbal Town', 'lat' => 31.450000, 'lng' => 74.270000],
      ['name' => 'Faisal Town', 'lat' => 31.480000, 'lng' => 74.300000],
      ['name' => 'Garden Town', 'lat' => 31.510000, 'lng' => 74.330000],
      ['name' => 'Cantt', 'lat' => 31.540000, 'lng' => 74.350000],
      ['name' => 'Wapda Town', 'lat' => 31.440000, 'lng' => 74.250000],
      ['name' => 'Valencia', 'lat' => 31.420000, 'lng' => 74.230000],
      ['name' => 'Samanabad', 'lat' => 31.530000, 'lng' => 74.300000],
      ['name' => 'Iqbal Town', 'lat' => 31.490000, 'lng' => 74.280000],
      ['name' => 'Mughalpura', 'lat' => 31.570000, 'lng' => 74.320000],
      ['name' => 'Raiwind', 'lat' => 31.250000, 'lng' => 74.220000],
      ['name' => 'Thokar Niaz Baig', 'lat' => 31.430000, 'lng' => 74.260000],
      ['name' => 'Jail Road', 'lat' => 31.540000, 'lng' => 74.330000],
      ['name' => 'Barki Road', 'lat' => 31.380000, 'lng' => 74.350000],
      ['name' => 'Bahria Town Lahore', 'lat' => 31.380000, 'lng' => 74.180000],
    ],

    'Islamabad' => [
      ['name' => 'F-6', 'lat' => 33.708615, 'lng' => 73.066154],
      ['name' => 'F-7', 'lat' => 33.705947, 'lng' => 73.049278],
      ['name' => 'F-8', 'lat' => 33.700000, 'lng' => 73.050000],
      ['name' => 'G-6', 'lat' => 33.700000, 'lng' => 73.070000],
      ['name' => 'G-7', 'lat' => 33.690000, 'lng' => 73.040000],
      ['name' => 'G-8', 'lat' => 33.680000, 'lng' => 73.030000],
      ['name' => 'G-9', 'lat' => 33.670000, 'lng' => 73.020000],
      ['name' => 'G-10', 'lat' => 33.718432, 'lng' => 72.982330],
      ['name' => 'G-11', 'lat' => 33.650000, 'lng' => 73.010000],
      ['name' => 'I-8', 'lat' => 33.660000, 'lng' => 73.070000],
      ['name' => 'I-9', 'lat' => 33.640000, 'lng' => 73.050000],
      ['name' => 'I-10', 'lat' => 33.640000, 'lng' => 73.020000],
      ['name' => 'Blue Area', 'lat' => 33.684422, 'lng' => 73.047882],
      ['name' => 'Sector E-11', 'lat' => 33.657821, 'lng' => 73.170632],
      ['name' => 'Sector H-8', 'lat' => 33.670000, 'lng' => 73.090000],
      ['name' => 'Sector H-9', 'lat' => 33.660000, 'lng' => 73.080000],
      ['name' => 'Sector H-12', 'lat' => 33.620000, 'lng' => 73.000000],
      ['name' => 'DHA Phase 1-2', 'lat' => 33.600000, 'lng' => 73.050000],
      ['name' => 'Bahria Town', 'lat' => 33.580000, 'lng' => 73.100000],
      ['name' => 'Margalla Town', 'lat' => 33.750000, 'lng' => 73.030000],
    ],

    'Rawalpindi' => [
      ['name' => 'Saddar', 'lat' => 33.606084, 'lng' => 73.033134],
      ['name' => 'Gulzar-e-Quaid', 'lat' => 33.590588, 'lng' => 73.039124],
      ['name' => 'Dhok Chatha', 'lat' => 33.593018, 'lng' => 72.980827],
      ['name' => 'Bahria Town', 'lat' => 33.531888, 'lng' => 73.071243],
      ['name' => 'Satellite Town', 'lat' => 33.590000, 'lng' => 73.030000],
      ['name' => 'Westridge', 'lat' => 33.580000, 'lng' => 73.070000],
      ['name' => 'Raja Bazar', 'lat' => 33.600000, 'lng' => 73.070000],
      ['name' => 'Mohanpura', 'lat' => 33.610000, 'lng' => 73.020000],
      ['name' => 'Gulistan Colony', 'lat' => 33.580000, 'lng' => 73.040000],
      ['name' => 'Dhoke Kala Khan', 'lat' => 33.620000, 'lng' => 73.050000],
      ['name' => 'Pir Wadhai', 'lat' => 33.630000, 'lng' => 73.010000],
      ['name' => 'Chaklala Scheme 3', 'lat' => 33.600000, 'lng' => 73.010000],
      ['name' => 'Askari 14', 'lat' => 33.560000, 'lng' => 73.050000],
      ['name' => 'Sadiqabad', 'lat' => 33.570000, 'lng' => 73.020000],
      ['name' => 'Committee Chowk', 'lat' => 33.620000, 'lng' => 73.080000],
      ['name' => 'Gulraiz', 'lat' => 33.640000, 'lng' => 73.060000],
      ['name' => 'Khayaban-e-Sir Syed', 'lat' => 33.550000, 'lng' => 73.030000],
      ['name' => 'Naseerabad', 'lat' => 33.590000, 'lng' => 73.010000],
      ['name' => 'Tench Bhatta', 'lat' => 33.610000, 'lng' => 73.040000],
      ['name' => 'Adiala Road', 'lat' => 33.650000, 'lng' => 73.020000],
    ],

    'Peshawar' => [
      ['name' => 'University Road', 'lat' => 34.012800, 'lng' => 71.580124],
      ['name' => 'Hayatabad Phase 1-7', 'lat' => 34.000259, 'lng' => 71.475182],
      ['name' => 'Gulbahar', 'lat' => 34.004917, 'lng' => 71.555176],
      ['name' => 'Saddar', 'lat' => 34.004163, 'lng' => 71.543976],
      ['name' => 'Cantt', 'lat' => 33.990000, 'lng' => 71.520000],
      ['name' => 'Kohat Road', 'lat' => 33.950000, 'lng' => 71.550000],
      ['name' => 'Warsak Road', 'lat' => 34.030000, 'lng' => 71.500000],
      ['name' => 'Charsadda Road', 'lat' => 34.050000, 'lng' => 71.600000],
      ['name' => 'Jamrud Road', 'lat' => 33.970000, 'lng' => 71.480000],
      ['name' => 'Deans Trade Centre', 'lat' => 34.000000, 'lng' => 71.540000],
      ['name' => 'Regi Model Town', 'lat' => 33.940000, 'lng' => 71.470000],
      ['name' => 'Karkhano Market', 'lat' => 34.020000, 'lng' => 71.490000],
      ['name' => 'Phase 5 Hayatabad', 'lat' => 33.970000, 'lng' => 71.450000],
      ['name' => 'Shahi Bagh', 'lat' => 34.010000, 'lng' => 71.570000],
      ['name' => 'Pajaggi Road', 'lat' => 34.020000, 'lng' => 71.560000],
    ],

    'Quetta' => [
      ['name' => 'Jinnah Road', 'lat' => 30.204708, 'lng' => 67.013611],
      ['name' => 'Satellite Town', 'lat' => 30.236124, 'lng' => 67.010925],
      ['name' => 'Sariab Road', 'lat' => 30.194691, 'lng' => 67.006683],
      ['name' => 'Mian Ghundi', 'lat' => 30.230000, 'lng' => 67.020000],
      ['name' => 'Brewery Road', 'lat' => 30.190000, 'lng' => 66.980000],
      ['name' => 'Prince Road', 'lat' => 30.210000, 'lng' => 67.000000],
      ['name' => 'Eastern Bypass', 'lat' => 30.260000, 'lng' => 67.050000],
      ['name' => 'Kandahari Bazar', 'lat' => 30.190000, 'lng' => 67.010000],
      ['name' => 'Mecongi Road', 'lat' => 30.140000, 'lng' => 66.920000],
      ['name' => 'Spiny Road', 'lat' => 30.280000, 'lng' => 66.970000],
      ['name' => 'Killi Deba', 'lat' => 30.200000, 'lng' => 66.930000],
      ['name' => 'Samungli Road', 'lat' => 30.250000, 'lng' => 66.900000],
    ],

    'Faisalabad' => [
      ['name' => 'Madina Town', 'lat' => 31.394500, 'lng' => 73.088838],
      ['name' => 'Ghulam Muhammad Abad', 'lat' => 31.437500, 'lng' => 73.110260],
      ['name' => 'D Ground', 'lat' => 31.416334, 'lng' => 73.079643],
      ['name' => 'Peoples Colony', 'lat' => 31.450000, 'lng' => 73.100000],
      ['name' => 'Civic Centre', 'lat' => 31.430000, 'lng' => 73.080000],
      ['name' => 'Jinnah Colony', 'lat' => 31.400000, 'lng' => 73.090000],
      ['name' => 'Samanabad', 'lat' => 31.440000, 'lng' => 73.070000],
      ['name' => 'Millat Town', 'lat' => 31.460000, 'lng' => 73.090000],
      ['name' => 'Gulberg', 'lat' => 31.480000, 'lng' => 73.060000],
      ['name' => 'Lyallpur Town', 'lat' => 31.410000, 'lng' => 73.110000],
      ['name' => 'Jaranwala Road', 'lat' => 31.500000, 'lng' => 73.150000],
      ['name' => 'Sargodha Road', 'lat' => 31.520000, 'lng' => 73.050000],
      ['name' => 'Satiana Road', 'lat' => 31.380000, 'lng' => 73.060000],
      ['name' => 'Batala Colony', 'lat' => 31.420000, 'lng' => 73.120000],
      ['name' => 'Islamabad Town', 'lat' => 31.470000, 'lng' => 73.130000],
    ],

    'Multan' => [
      ['name' => 'Bosan Road', 'lat' => 30.192917, 'lng' => 71.467071],
      ['name' => 'Gulgasht', 'lat' => 30.196800, 'lng' => 71.457900],
      ['name' => 'Town Ship', 'lat' => 30.157500, 'lng' => 71.459100],
      ['name' => 'LMQ Road', 'lat' => 30.220000, 'lng' => 71.500000],
      ['name' => 'Shah Rukn-e-Alam Colony', 'lat' => 30.200000, 'lng' => 71.460000],
      ['name' => 'Cantt', 'lat' => 30.260000, 'lng' => 71.510000],
      ['name' => 'Sher Shah Road', 'lat' => 30.190000, 'lng' => 71.440000],
      ['name' => 'Qasim Bela', 'lat' => 30.270000, 'lng' => 71.470000],
      ['name' => 'Chowk Kumharanwala', 'lat' => 30.210000, 'lng' => 71.420000],
      ['name' => 'Shah Shams Road', 'lat' => 30.180000, 'lng' => 71.480000],
      ['name' => 'New Multan', 'lat' => 30.250000, 'lng' => 71.440000],
      ['name' => 'Wapda Town', 'lat' => 30.280000, 'lng' => 71.530000],
      ['name' => 'BCG Chowk', 'lat' => 30.260000, 'lng' => 71.490000],
    ],

    'Hyderabad' => [
      ['name' => 'Latifabad', 'lat' => 25.384540, 'lng' => 68.360580],
      ['name' => 'Qasimabad', 'lat' => 25.397757, 'lng' => 68.356164],
      ['name' => 'Hyderabad Cantonment', 'lat' => 25.392600, 'lng' => 68.356400],
      ['name' => 'Housing Society', 'lat' => 25.430000, 'lng' => 68.320000],
      ['name' => 'Autobahn Road', 'lat' => 25.450000, 'lng' => 68.300000],
      ['name' => 'Kotri', 'lat' => 25.360000, 'lng' => 68.300000],
      ['name' => 'Jamshoro Road', 'lat' => 25.470000, 'lng' => 68.350000],
      ['name' => 'Station Road', 'lat' => 25.390000, 'lng' => 68.360000],
      ['name' => 'Hala Road', 'lat' => 25.410000, 'lng' => 68.400000],
      ['name' => 'Paretabad', 'lat' => 25.370000, 'lng' => 68.340000],
      ['name' => 'Risala Road', 'lat' => 25.400000, 'lng' => 68.380000],
      ['name' => 'Market Tower', 'lat' => 25.390000, 'lng' => 68.370000],
    ],

    'Sialkot' => [
      ['name' => 'Sialkot Cantt', 'lat' => 32.501160, 'lng' => 74.521980],
      ['name' => 'Daska Road', 'lat' => 32.484500, 'lng' => 74.533800],
      ['name' => 'Model Town', 'lat' => 32.494200, 'lng' => 74.522400],
      ['name' => 'Sambrial Road', 'lat' => 32.470000, 'lng' => 74.550000],
      ['name' => 'Wazirabad Road', 'lat' => 32.520000, 'lng' => 74.480000],
      ['name' => 'Allama Iqbal Road', 'lat' => 32.490000, 'lng' => 74.530000],
      ['name' => 'Paris Road', 'lat' => 32.500000, 'lng' => 74.510000],
      ['name' => 'Kashmir Road', 'lat' => 32.480000, 'lng' => 74.540000],
    ],

    'Gujranwala' => [
      ['name' => 'Gujranwala Cantt', 'lat' => 32.160000, 'lng' => 74.189400],
      ['name' => 'Model Town', 'lat' => 32.180800, 'lng' => 74.200800],
      ['name' => 'Satellite Town', 'lat' => 32.160700, 'lng' => 74.195500],
      ['name' => 'GT Road', 'lat' => 32.160000, 'lng' => 74.190000],
      ['name' => 'Peoples Colony', 'lat' => 32.180000, 'lng' => 74.170000],
      ['name' => 'Sialkot Bypass', 'lat' => 32.220000, 'lng' => 74.240000],
      ['name' => 'Kashmir Road', 'lat' => 32.150000, 'lng' => 74.200000],
      ['name' => 'Chenab Road', 'lat' => 32.140000, 'lng' => 74.150000],
      ['name' => 'Nandipura', 'lat' => 32.190000, 'lng' => 74.230000],
      ['name' => 'Khiali Shahpur', 'lat' => 32.170000, 'lng' => 74.250000],
    ],

    // Additional major cities
    'Abbottabad' => [
      ['name' => 'Jinnahabad', 'lat' => 34.150000, 'lng' => 73.220000],
      ['name' => 'Cantt', 'lat' => 34.170000, 'lng' => 73.210000],
      ['name' => 'Supply Bazar', 'lat' => 34.160000, 'lng' => 73.230000],
      ['name' => 'Mandian', 'lat' => 34.180000, 'lng' => 73.200000],
    ],

    'Sargodha' => [
      ['name' => 'Cantt', 'lat' => 32.080000, 'lng' => 72.670000],
      ['name' => 'Satellite Town', 'lat' => 32.060000, 'lng' => 72.680000],
      ['name' => 'People\'s Colony', 'lat' => 32.070000, 'lng' => 72.660000],
    ],

    'Bahawalpur' => [
      ['name' => 'Model Town', 'lat' => 29.400000, 'lng' => 71.680000],
      ['name' => 'Shahdara Town', 'lat' => 29.420000, 'lng' => 71.670000],
      ['name' => 'Cantt', 'lat' => 29.380000, 'lng' => 71.690000],
    ],

    'Sukkur' => [
      ['name' => 'Military Road', 'lat' => 27.710000, 'lng' => 68.850000],
      ['name' => 'Rohri', 'lat' => 27.680000, 'lng' => 68.890000],
      ['name' => 'New Pind', 'lat' => 27.730000, 'lng' => 68.870000],
    ],

    'Larkana' => [
      ['name' => 'Cantt', 'lat' => 27.560000, 'lng' => 68.230000],
      ['name' => 'Jinnah Bagh', 'lat' => 27.550000, 'lng' => 68.220000],
      ['name' => 'Model Town', 'lat' => 27.540000, 'lng' => 68.240000],
    ],

    'Mardan' => [
      ['name' => 'Cantt', 'lat' => 34.200000, 'lng' => 72.050000],
      ['name' => 'University Town', 'lat' => 34.220000, 'lng' => 72.030000],
      ['name' => 'Shahbaz Garhi', 'lat' => 34.180000, 'lng' => 72.070000],
    ],

    'Mingaora' => [
      ['name' => 'Green Chowk', 'lat' => 34.780000, 'lng' => 72.360000],
      ['name' => 'Saidu Sharif', 'lat' => 34.750000, 'lng' => 72.350000],
      ['name' => 'Daggar', 'lat' => 34.770000, 'lng' => 72.380000],
    ],

    'Jacobabad' => [
      ['name' => 'Cantt', 'lat' => 28.280000, 'lng' => 68.450000],
      ['name' => 'Model Town', 'lat' => 28.300000, 'lng' => 68.430000],
    ],

    'Khuzdar' => [
      ['name' => 'City Center', 'lat' => 27.800000, 'lng' => 66.610000],
      ['name' => 'New Town', 'lat' => 27.820000, 'lng' => 66.590000],
    ],

    'Zhob' => [
      ['name' => 'Cantt', 'lat' => 31.350000, 'lng' => 69.450000],
      ['name' => 'City Area', 'lat' => 31.330000, 'lng' => 69.470000],
    ],
  ];

  protected $jitterKm = 0.2;

  public function definition()
  {
    $city = $this->faker->randomElement(array_keys(self::$pakistanAreas));
    $area = $this->faker->randomElement(self::$pakistanAreas[$city]);

    [$lat, $lng] = $this->applyJitter($area['lat'], $area['lng'], $this->jitterKm);

    $title = $this->faker->company . ' ' . $this->faker->randomElement(['Fiber', 'Broadband', 'Wireless', 'DSL']) . ' ' . $this->faker->randomElement(['Basic', 'Pro', 'Max']);

    $packages = [
      [
        'name' => 'Basic',
        'price' => $this->faker->numberBetween(999, 1999),
        'billing_cycle' => 'Monthly',
        'speed_label' => '10 Mbps',
        'features' => $this->faker->randomElements(['Free Router', '24/7 Support', 'No FUP', 'Static IP', 'Unlimited Data'], 2),
        'description' => 'Entry-level plan',
        'currency' => 'PKR',
        'is_popular' => $this->faker->boolean(20),
      ],
      [
        'name' => 'Standard',
        'price' => $this->faker->numberBetween(2000, 4999),
        'billing_cycle' => 'Monthly',
        'speed_label' => '50 Mbps',
        'features' => $this->faker->randomElements(['Static IP (optional)', 'Priority Support', 'Free Router', '24/7 Support', 'No FUP', 'Unlimited Data'], 2),
        'description' => 'Balanced price & speed',
        'currency' => 'PKR',
        'is_popular' => $this->faker->boolean(60),
      ],
      [
        'name' => 'Premium',
        'price' => $this->faker->numberBetween(5000, 14999),
        'billing_cycle' => 'Monthly',
        'speed_label' => '100 Mbps',
        'features' => $this->faker->randomElements(['Unlimited FUP', 'Dedicated Tech', 'Static IP (optional)', 'Priority Support', 'Free Router', '24/7 Support'], rand(2, 4)),
        'description' => 'Best performance',
        'currency' => 'PKR',
        'is_popular' => $this->faker->boolean(80),
      ],
    ];

    return [
      'user_id' => User::factory()->vendor(),
      'title' => $title,
      'slug' => Str::slug($title) . '-' . Str::random(4),
      'city' => $city,
      'latitude' => $lat,
      'longitude' => $lng,
      'location' => $city . ' — ' . $area['name'],
      'connection_type' => $this->faker->randomElement(['fiber', 'dsl', 'wireless']),
      'highlight' => $this->faker->randomElement(['new', 'trending', 'reliable', 'popular', 'undefined']),
      'short_description' => $this->faker->sentence(8),
      'full_description' => $this->faker->paragraphs(3, true),
      'packages' => $packages,
      'posted_date' => now()->subDays($this->faker->numberBetween(0, 90)),
      'features' => $this->generateFeatures(),
      'faqs' => $this->generateFaqs(),
      'images' => [
        'https://picsum.photos/seed/service' . $this->faker->unique()->numberBetween(1, 10000) . '/800/450'
      ],
      'speed_details' => $this->generateSpeedDetails(),
      'coverage_area' => $city . ' — ' . $area['name'],
      'is_active' => $this->faker->boolean(90),
    ];
  }

  private function generateFaqs(): array
  {
    $faqs = [];
    $questions = [
      'What is the installation process?',
      'Do you offer free trial?',
      'What is your uptime guarantee?',
      'How to pay bills?',
      'Is installation free?',
      'Do you have data caps?',
      'Is there any contract?',
      'What is your support timing?'
    ];

    for ($i = 0; $i < rand(3, 6); $i++) {
      $faqs[] = [
        'question' => $questions[$i] ?? $this->faker->sentence(),
        'answer' => $this->faker->paragraph(2),
      ];
    }

    return $faqs;
  }

  private function generateFeatures(): array
  {
    $features = [
      'Free Router',
      '24/7 Support',
      'No FUP',
      'Static IP',
      'Unlimited Data',
      'Money Back Guarantee',
      'Free Installation',
      'Low Latency',
      'High Upload Speed',
    ];

    return $this->faker->randomElements($features, rand(3, 6));
  }


  private function generateSpeedDetails(): array
  {

    $speedTiers = [
      'fiber' => [
        'download' => ['50 Mbps', '100 Mbps', '200 Mbps', '500 Mbps', '1 Gbps'],
        'upload' => ['25 Mbps', '50 Mbps', '100 Mbps', '250 Mbps', '500 Mbps'],
      ],
      'dsl' => [
        'download' => ['10 Mbps', '20 Mbps', '50 Mbps', '100 Mbps'],
        'upload' => ['5 Mbps', '10 Mbps', '20 Mbps', '50 Mbps'],
      ],
      'wireless' => [
        'download' => ['5 Mbps', '10 Mbps', '20 Mbps', '50 Mbps'],
        'upload' => ['2 Mbps', '5 Mbps', '10 Mbps', '25 Mbps'],
      ]
    ];

    $connectionType = $this->faker->randomElement(['fiber', 'dsl', 'wireless']);
    $tier = $speedTiers[$connectionType];

    $download = $this->faker->randomElement($tier['download']);
    $upload = $this->faker->randomElement($tier['upload']);

    $latencyRanges = [
      'fiber' => [2, 10],
      'dsl' => [10, 30],
      'wireless' => [15, 50]
    ];

    $latencyRange = $latencyRanges[$connectionType];
    $latency = $this->faker->numberBetween($latencyRange[0], $latencyRange[1]) . ' ms';

    // Fiber usually has unlimited, others might have caps
    $dataCap = $connectionType === 'fiber'
      ? 'Unlimited'
      : ($this->faker->boolean(70) ? 'Unlimited' : $this->faker->randomElement(['1TB', '500GB', '250GB']));

    return [
      'download' => $download,
      'upload' => $upload,
      'latency' => $latency,
      'data_cap' => $dataCap,
    ];
  }


  private function applyJitter(float $lat, float $lng, float $jitterKm = 0.0): array
  {
    if ($jitterKm <= 0) {
      return [$lat, $lng];
    }

    $maxDegLat = $jitterKm / 111.0;
    $maxDegLng = $jitterKm / (111.0 * cos(deg2rad($lat)));

    $deltaLat = $this->faker->randomFloat(6, -$maxDegLat, $maxDegLat);
    $deltaLng = $this->faker->randomFloat(6, -$maxDegLng, $maxDegLng);

    return [$lat + $deltaLat, $lng + $deltaLng];
  }
}
