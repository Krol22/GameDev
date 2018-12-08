import { AssetType, AssetLoaderState, AssetManager } from '.';

interface IPercentageData {
    loadedPercentage: number,
    assetsLoaded: number,
    assetsToBeLoaded: number
}

interface IAssetMetadata {
    name: string,
    type: AssetType,
    src: string,
}

const assetFactory = (assetType: AssetType) : any => {
    let asset;

    switch(assetType) {
        case AssetType.IMAGE:
            asset = new Image();
            break;
        case AssetType.AUDIO:
            asset = new Audio();
            break;
    }

    return asset;
}

const updatePercentageData = (percentageData: IPercentageData) : IPercentageData => {
    percentageData.assetsLoaded++;
    percentageData.loadedPercentage = percentageData.assetsLoaded / percentageData.assetsToBeLoaded;

    return percentageData;
}

export class AssetLoader {
    static state: AssetLoaderState = AssetLoaderState.IDLE;
    private static percentageData: IPercentageData = {
        loadedPercentage: 0,
        assetsLoaded: 0,
        assetsToBeLoaded: 0
    };

    private static loadingAssetsCounter: number = 0;
    private static loadAsset(assetData: IAssetMetadata) : Promise<{}> {
        return new Promise((resolve) => {
            AssetLoader.state = AssetLoaderState.LOADING;
            AssetLoader.loadingAssetsCounter++;

            let asset = assetFactory(assetData.type);

            asset.src = assetData.src;
            asset.onload = () => {
                AssetLoader.loadingAssetsCounter--;
                if (!AssetLoader.loadingAssetsCounter) {
                    AssetLoader.state = AssetLoaderState.LOADED;
                }

                updatePercentageData(AssetLoader.percentageData);

                AssetManager.addAsset({ ...assetData, asset });
                resolve();
            }

            asset.onerror = (e: ErrorEvent) => {
                throw new Error(`Could not load asset ${name}: ${e.message}`);
            }
        });
    }

    static getPercentge() : IPercentageData {
        return AssetLoader.percentageData;
    }

    static loadAssets(assetsData: IAssetMetadata[]) {
        let promises = [] as Promise<{}>[];

        AssetLoader.percentageData.assetsLoaded = 0;
        AssetLoader.percentageData.assetsToBeLoaded = assetsData.length;

        assetsData.forEach((assetData: IAssetMetadata) => {
            promises.push(AssetLoader.loadAsset(assetData));
        });

        return Promise.all(promises);
    }
}