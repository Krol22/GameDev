import { AssetType } from '.';

interface IAssetData {
    name: string,
    type: AssetType,
    src: string,
    asset: any
};

interface IAssets {
    [key: string]: IAssetData
}
export class AssetManager {
    private static _assets: IAssets[] = [];

    static addAsset(asset: IAssetData) : void {
        if (AssetManager._assets[asset.name]) {
            throw new Error(`Asset ${name} is already declared!`);
        }

        AssetManager._assets[asset.name] = asset;
    }

    static getAsset(name: string) : IAssetData {
        return AssetManager._assets[name];
    }
    static removeAsset(name: string) : void {
        AssetManager._assets[name] = null;
    }
};