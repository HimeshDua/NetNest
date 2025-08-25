import { CmsYes } from '@/types/cms';
import { useForm } from '@inertiajs/react';

const CmsForm = ({ cms }: { cms: CmsYes }) => {
    const { data, setData, post, processing, errors } = useForm({
        hero: cms.hero || { title: '', subtitle: '', buttons: [], mockup: {} },
        marquees: cms.marquees || [],
        features_primary: cms.features_primary || [],
        features_secondary: cms.features_secondary || [],
        about: cms.about || { title: '', description: '', image: null },
        testimonials: cms.testimonials || [],
        seo: cms.seo || { title: '', description: '', keywords: [] },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(data);
        post(route('admin.cms.update'));
    };

    const handleFileChange = (field, file) => {
        setData(field, file);
    };

    const addArrayItem = (field, template = {}) => {
        setData(field, [...data[field], template]);
    };

    const removeArrayItem = (field, index) => {
        const newArray = data[field].filter((_, i) => i !== index);
        setData(field, newArray);
    };

    const updateArrayItem = (field, index, key, value) => {
        const newArray = data[field].map((item, i) => (i === index ? { ...item, [key]: value } : item));
        setData(field, newArray);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Hero Section */}
            <div>
                <label>Hero Title</label>
                <input type="text" value={data.hero.title || ''} onChange={(e) => setData('hero', { ...data.hero, title: e.target.value })} />
                {errors['hero.title'] && <div>{errors['hero.title']}</div>}

                <label>Hero Mockup (Light)</label>
                <input type="file" onChange={(e) => handleFileChange('hero.mockup.srcLight', e.target.files[0])} />
                {/* Similar for other fields */}
            </div>

            {/* Marquees Section */}
            <div>
                <h3>Marquees</h3>
                {data.marquees.map((marquee, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={marquee.text || ''}
                            onChange={(e) => updateArrayItem('marquees', index, 'text', e.target.value)}
                            placeholder="Marquee text"
                        />
                        <button type="button" onClick={() => removeArrayItem('marquees', index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem('marquees', { text: '', link: '' })}>
                    Add Marquee
                </button>
            </div>

            {/* Similar sections for other fields */}

            <button type="submit" disabled={processing}>
                Save Changes
            </button>
        </form>
    );
};

export default CmsForm;
