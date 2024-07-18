const options = {
    headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        'Content-Type': 'application/json'
    }
}; 

export default options;