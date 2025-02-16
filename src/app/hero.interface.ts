export interface Hero {
    id: number;
    name: string;
    description: string;
    modified: Date;
    resourceURI: string;
    urls: Url[];
    thumbnail: Image;
    comics: ResourceList<ComicSummary>;
    stories: ResourceList<StorySummary>;
    events: ResourceList<EventSummary>;
    series: ResourceList<SeriesSummary>;
  }
  
  export interface Url {
    type: string;
    url: string;
  }
  
  export interface Image {
    path: string;
    extension: string;
  }
  
  export interface ResourceList<T> {
    available: number;
    collectionURI: string;
    items: T[];
    returned: number;
  }
  
  export interface ComicSummary {
    resourceURI: string;
    name: string;
  }
  
  export interface StorySummary {
    resourceURI: string;
    name: string;
  }
  
  export interface EventSummary {
    resourceURI: string;
    name: string;
  }
  
  export interface SeriesSummary {
    resourceURI: string;
    name: string;
  }
  