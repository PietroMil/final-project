
const BASE_URL = "https://api.tvmaze.com";
//creao gli adapter tra server e front end "ShowApiRes"(servizio) e "ShowType"(ui o applicazione)
type ShowApiResType = {
    show: {
        id: number;
        name: string;
        image?: {
            medium: string;
        }
    }
}

export type ShowType = {
    id: number;
    title: string;
    image?: string;
}

export type ShowFavorites = {
    id: number,
    imgUrl?: string,
    title: string
}

type ShowDetailResType = {
    id: number;
    name: string;
    generes: string[];
    premiered: string;
    ended?: string;
    rating?: {
        average: number;
    }
    image?: {
        original: string;
    }
    summary: string;

}

export type ShowDetailType = {
    id: number;
    title: string;
    generes: string[];
    startDate: string;
    endDate?: string;
    avgRating?: number;
    image?: string;
    summary?: string;
}

//faccio un trim di una queri e se è vuoto ritorno un array vuoto
export const getShowsBySearch = async (query: string) => {
    query = query.trim();

    if (query.length === 0) {
        return []
    }

    const res = await fetch(`${BASE_URL}/search/shows?q=${query}`);

    const data: ShowApiResType[] = (await res.json()) as ShowApiResType[];//forzatura del casting

    const mappedData: ShowType[] = data.map((element) => ({
        id: element.show.id,
        title: element.show.name,
        image: element.show.image?.medium
    }));

    return mappedData;

}

export const getShowById = async (id: number) => {
    //condizione per controllo id minori di 0
    if (id < 0) {
        return null
    }
    //dipendenze dal server
    const res = await fetch(`${BASE_URL}/shows/${id}`)

    const data: ShowDetailResType = (await res.json() as ShowDetailResType);

    //il mio ui
    const mappedData: ShowDetailType = {
        id: data.id,
        title: data.name,
        generes: data.generes,
        startDate: data.premiered,
        endDate: data.ended,
        avgRating: data.rating?.average,
        image: data.image?.original,
        summary: data.summary.replace(/<\/?[\w\s]*>|<.+[\W]>/g, ' ')

    }

    return mappedData;
}