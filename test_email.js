import fetch from 'node-fetch';

async function test() {
    const data = {
        service_id: 'service_b8c5ctl',
        template_id: 'template_fwt5ntg',
        user_id: 'spXuZ8Th9gzRZ1c0w',
        template_params: {
            name: 'Test Name',
            email: "test'@example.com",
            message: 'Hello world'
        }
    };

    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'origin': 'https://www.daarshannexaa.in',
                'referer': 'https://www.daarshannexaa.in/'
            },
            body: JSON.stringify(data)
        });
        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Body:', text);
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
