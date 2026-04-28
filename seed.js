require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const Feature = require('./models/Feature');
const Testimonial = require('./models/Testimonial');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

async function seedDatabase() {
    try {
        console.log('\n🌱 Starting database seeding...\n');

        // Clear existing data
        await Service.deleteMany({});
        await Feature.deleteMany({});
        await Testimonial.deleteMany({});

        // Seed Services
        const services = [
            {
                title: 'Web Design',
                description: 'Creating visually stunning and user-friendly interfaces that captivate and engage your audience.',
                icon: '🎨',
                price: 1500,
                duration: '2-3 weeks',
                features: ['Responsive Design', 'Modern UI', 'User-friendly'],
                order: 1
            },
            {
                title: 'Web Development',
                description: 'Building responsive, fast, and scalable web applications using the latest technologies.',
                icon: '💻',
                price: 2500,
                duration: '4-6 weeks',
                features: ['Full Stack', 'API Integration', 'Database Design'],
                order: 2
            },
            {
                title: 'Mobile Optimization',
                description: 'Ensuring your website works perfectly on all devices with optimized performance.',
                icon: '📱',
                price: 1000,
                duration: '1-2 weeks',
                features: ['Mobile-first', 'Cross-browser', 'Performance'],
                order: 3
            },
            {
                title: 'SEO Optimization',
                description: 'Improving your online visibility and ranking on search engines for better organic traffic.',
                icon: '🔍',
                price: 800,
                duration: 'Ongoing',
                features: ['On-page SEO', 'Technical SEO', 'Content Optimization'],
                order: 4
            },
            {
                title: 'Performance',
                description: 'Lightning-fast loading times and smooth user experience across all platforms.',
                icon: '⚡',
                price: 1200,
                duration: '2-3 weeks',
                features: ['Optimization', 'Caching', 'Analytics'],
                order: 5
            },
            {
                title: 'Security',
                description: 'Protecting your data with industry-standard security practices and protocols.',
                icon: '🛡️',
                price: 1500,
                duration: 'Ongoing',
                features: ['SSL/TLS', 'Firewalls', 'Regular Audits'],
                order: 6
            }
        ];

        const createdServices = await Service.insertMany(services);
        console.log(`✓ ${createdServices.length} services created`);

        // Seed Features
        const features = [
            {
                title: 'Responsive Design',
                description: 'Perfectly optimized for all screen sizes and devices',
                number: 1,
                icon: '📱'
            },
            {
                title: 'Modern Technology',
                description: 'Using cutting-edge tools and frameworks',
                number: 2,
                icon: '🚀'
            },
            {
                title: 'Expert Team',
                description: 'Highly skilled and experienced professionals',
                number: 3,
                icon: '👥'
            },
            {
                title: '24/7 Support',
                description: 'Always available to help and support you',
                number: 4,
                icon: '🤝'
            }
        ];

        const createdFeatures = await Feature.insertMany(features);
        console.log(`✓ ${createdFeatures.length} features created`);

        // Seed Testimonials
        const testimonials = [
            {
                text: 'Responsive Fanta delivered an exceptional website that exceeded our expectations. The team was professional and attentive throughout the process.',
                author: 'Sarah Johnson',
                position: 'CEO',
                company: 'Tech Innovations',
                rating: 5,
                order: 1
            },
            {
                text: 'The attention to detail and commitment to quality is outstanding. Our website performance improved dramatically after working with them.',
                author: 'Michael Chen',
                position: 'Founder',
                company: 'Digital Solutions Co.',
                rating: 5,
                order: 2
            },
            {
                text: 'Best investment we made for our business. The website is not only beautiful but also brings in more conversions. Highly recommended!',
                author: 'Emma Williams',
                position: 'Marketing Director',
                company: 'Growth Labs',
                rating: 5,
                order: 3
            }
        ];

        const createdTestimonials = await Testimonial.insertMany(testimonials);
        console.log(`✓ ${createdTestimonials.length} testimonials created\n`);

        console.log('✅ Database seeded successfully!\n');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        db.close();
        process.exit(0);
    }
}

seedDatabase();
