export const generateCopyscapeResponse = async (text: string) => {
    try {
        const response = await fetch('https://www.copyscape.com/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                u: process.env.COPYESCAPE_API_USERNAME,       // Your Copyscape username
                k: process.env.COPYESCAPE_API_KEY, // Your Copyscape API key
                o: 'csearch',        // Operation: csearch for checking text
                t: text,             // Text to be checked for plagiarism
                f: 'json',           // Format of the response: json
                x: '1',              // Optional parameter (x:1 for premium users)
            }).toString(),
        });

        const result = await response.json();  // Since you expect a JSON response

        console.log(result);
        return result;
    } catch (error) {   
        console.log('generateCopyscape Error:', error);
        return 'Error generating Copyscape response';
    }
}
