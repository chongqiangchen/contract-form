

const autoScaleText = (text: string, fontSize: number, maxWidth: number) => {
    const textWidth = text.length * fontSize;
    if (textWidth > maxWidth) {
        return Math.floor(maxWidth / text.length);
    }
    return fontSize;
}


export default autoScaleText;