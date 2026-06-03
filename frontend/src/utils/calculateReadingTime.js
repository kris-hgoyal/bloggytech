const calculateReadingTime = (content)=> {
    let wordsPerMin = 200;
    let totalWords = content?.split().length;
    let minutes = totalWords/wordsPerMin;
    const readTime = Math.ceil(minutes)
    return readTime
}

export default calculateReadingTime