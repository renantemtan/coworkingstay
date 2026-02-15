
import { getAllLocations, getSiteConfig, getFaqPage, getContactPage, getPoliciesPage } from '../lib/content-loader';

async function main() {
    try {
        console.log('Testing getSiteConfig...');
        const siteConfig = await getSiteConfig();
        console.log('Site Config:', JSON.stringify(siteConfig, null, 2));

        console.log('Testing getAllLocations...');
        const locations = await getAllLocations();
        console.log('Locations:', locations.map(l => l.name));



        console.log('Testing getFaqPage...');
        const faq = await getFaqPage();
        console.log('FAQ Page loaded');

        console.log('Testing getContactPage...');
        const contact = await getContactPage();
        console.log('Contact Page loaded');

        console.log('Testing getPoliciesPage...');
        const policies = await getPoliciesPage();
        console.log('Policies Page loaded');

        console.log('All tests passed!');
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

main();
