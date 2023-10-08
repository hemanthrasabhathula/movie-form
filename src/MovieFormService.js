import * as constants from './Constants';
class MovieFormService {

    replacer(key, value) {
        if (key === 'id' || key === 'runtime')
            value = value === '' ? value : Number(value)
        if (key === 'rating')
            value = value === '' ? value : parseFloat(value)
        return value
    }

    getFormattedOttId(ott_platform, ott_id) {
        let formatted_ott_id;

        switch (ott_platform) {

            case constants.AHA:
                formatted_ott_id = this.extractStringFromLastSlash(ott_id, constants.AHA_REGEX)
                break;
            case constants.HOTSTAR:
                formatted_ott_id = this.extractStringFromSecondToLastSlash(ott_id, constants.HOTSTAR_REGEX)
                break;
            case constants.NETFLIX:
                formatted_ott_id = this.extractStringFromLastSlash(ott_id, constants.NETFLIX_REGEX)
                break;
            case constants.PRIMEVIDEO:
                formatted_ott_id = this.extractStringFromLastEqualTo(ott_id, constants.PRIMEVIDEO_REGEX)
                break;
            case constants.SONYLIV:
                formatted_ott_id = this.extractStringFromLastSlash(ott_id, constants.SONYLIV_REGEX)
                break;
            case constants.SUNNXT:
                formatted_ott_id = this.extractStringFromThirdToLastSlash(ott_id, constants.SUNNXT_REGEX)
                break;
            case constants.ZEE5:
                formatted_ott_id = this.extractStringFromSecondToLastSlash(ott_id, constants.ZEE5_REGEX)
                break;
            default:
                formatted_ott_id = ott_id

        }

        return formatted_ott_id;

    }


    getottPlatformVal(url) {

        let ottPlatformValue = '';

        for (const [label, regex] of constants.platformRegexMap.entries()) {

            if (regex.test(url)) {
                return ottPlatformValue = label;
            }


        }

        return ottPlatformValue;
    }

    extractStringFromLastSlash(inputString, regex) {

        if (regex.test(inputString)) {
            const lastSlashIndex = inputString.lastIndexOf('/');
            if (lastSlashIndex !== -1) {
                return inputString.substring(lastSlashIndex + 1);
            } else {
                return inputString; // If there is no '/', return the original string
            }
        } else {
            console.log("URL is not valid.");
            return "URL is not valid.";
        }

    }


    extractStringFromSecondToLastSlash(inputString, regex) {

        if (regex.test(inputString)) {
            const lastSlashIndex = inputString.lastIndexOf('/');

            if (lastSlashIndex !== -1) {
                const secondToLastSlashIndex = inputString.lastIndexOf('/', lastSlashIndex - 1);

                if (secondToLastSlashIndex !== -1) {
                    return inputString.substring(secondToLastSlashIndex + 1);
                }
            }
            return inputString; // Return the original string if there is no second-to-last '/'
        } else {
            console.log("URL is not valid.");
            return "URL is not valid.";
        }
    }


    extractStringFromThirdToLastSlash(inputString, regex) {

        if (regex.test(inputString)) {
            const lastSlashIndex = inputString.lastIndexOf('/');

            if (lastSlashIndex !== -1) {
                const secondToLastSlashIndex = inputString.lastIndexOf('/', lastSlashIndex - 1);

                if (secondToLastSlashIndex !== -1) {
                    const thirdToLastSlashIndex = inputString.lastIndexOf('/', secondToLastSlashIndex - 1);

                    if (thirdToLastSlashIndex !== -1) {
                        return inputString.substring(thirdToLastSlashIndex + 1);
                    }
                }

            }
            return inputString; // Return the original string if there is no second-to-last '/'
        } else {
            console.log("URL is not valid.");
            return "URL is not valid.";
        }
    }

    extractStringFromLastEqualTo(inputString, regex) {

        if (regex.test(inputString)) {
            const idRegex = /gti=([^&]+)/;
            const match = inputString.match(idRegex);

            if (match) {
                // match[1] contains the extracted letters
                return match[1];
            }

            const lastEqualToIndex = inputString.lastIndexOf('=');

            if (lastEqualToIndex !== -1) {
                return inputString.substring(lastEqualToIndex + 1);
            } else {
                return inputString; // If there is no '=', return the original string
            }

        } else {
            console.log("URL is not valid.");
            return "URL is not valid.";
        }

    }

    extractMovieId = (url) => {

        if (url !== '') {
            if (/^[0-9]+$/.test(url)) {
                return url;
            }
            const numbersArray = url.match(/\/(\d+)(?:[^\d]|$)/);
            if (numbersArray) {
                // Extracted numbers will contain '/' at the beginning, so we need to remove it
                const cleanedNumbersArray = numbersArray[1]
                return cleanedNumbersArray;
            }
        }
        return 'Invalid URL or extension';
    };

    extractFilename = (url) => {
        // Check if 'name' is a URL ending with .jpg or .png
        if (url !== undefined) {
            if (url.endsWith('.jpg') || url.endsWith('.png')) {
                // Use regular expressions to extract the filename
                const matches = url.match(/\/([^/]+)\.(jpg|png)$/);
                if (matches && matches.length === 3) {
                    const filename = matches[0]; // Extracted filename
                    return filename;
                }
            }
        }
        return 'Invalid URL or extension';
    };


}
export default MovieFormService;