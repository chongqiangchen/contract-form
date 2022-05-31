
export interface IJsonFragmentType {
    readonly name?: string;
    readonly indexed?: boolean;
    readonly type?: string;
    readonly internalType?: any; // @TODO: in v6 reduce type
    readonly components?: ReadonlyArray<IJsonFragmentType>;
}

export interface IJsonFragment {
    readonly name?: string;
    readonly type?: string;

    readonly anonymous?: boolean;

    readonly payable?: boolean;
    readonly constant?: boolean;
    readonly stateMutability?: string;

    readonly inputs?: ReadonlyArray<IJsonFragmentType>;
    readonly outputs?: ReadonlyArray<IJsonFragmentType>;

    readonly gas?: string;
}