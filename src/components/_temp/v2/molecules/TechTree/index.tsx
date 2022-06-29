import React, {useCallback, useState, useRef, useEffect} from "react";
import Buttonable, { ButtonableProps } from "@components/atoms/Buttonable";
import { SerializedStyles } from "@emotion/react";
import {css} from "@emotion/react";
import Colors from "@styles/colors";
import { flexRowBetween } from "src/styles";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";
import RightMenuBody from "@tempComponents/v2/molecules/RightMenu/RightMenuBody";
import TechTreeItem from "@tempComponents/v2/molecules/TechTree/TechTreeItem_v1/TechTreeItem";
import TechTreeItemRow from "@tempComponents/v2/molecules/TechTree/TechTreeItem_v1/TechTreeItemRow";
import { obc } from "@tempComponents/v2/helper"
import { CgCardClubs } from "react-icons/cg";
import { version } from "os";
 
const TechTreeContainerCss = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    background: #2E3B43;

`
 
const TechTree = ({UniverseInfo})=>{
 
    const [UniverseInfoState, setUniverseInfo] = useState(UniverseInfo)
    // const [economicDevInfoState, setEconomicDevInfo] = useState(economicDevInfo)
    // const [assetClassInfoState, setAssetClassInfo] = useState(assetClassInfo)


    const updateUniverseInfoState = ()=>{
        const newUniverseInfoState = {...UniverseInfoState}
        newUniverseInfoState['label'][1] += 1
        newUniverseInfoState['assetClass']['Equity'] += 1
        newUniverseInfoState['economicDev']['Blended Development'] += 1
        setUniverseInfo(newUniverseInfoState)
    }

    const getSpaceWidths = (leftSpace, middleSpace, rightSpace)=>{
        return [leftSpace, middleSpace, rightSpace]
    }

    return(

        <div css={[TechTreeContainerCss]} onClick={updateUniverseInfoState}>

            <TechTreeItem>
                <TechTreeItemRow 
                    type={'title'} 
                    value={'Economic Development'}
                    spaceWidth = {getSpaceWidths(10, 100, 10)}
                    onClick={updateUniverseInfoState}
                />
                <TechTreeItemRow 
                    type={'weight'} 
                    value={UniverseInfoState['economicDev']}
                    spaceWidth = {getSpaceWidths(10, 100, 10)}
                    onClick={updateUniverseInfoState}
                />
            </TechTreeItem>

            <div css={[css`padding-left: 5px; padding-right: 8px;`]}>    
                <TechTreeItem>
                    <Image width={257} height={174} src={`/img/alvin/minimap_assetClass.png`} alt={'assetClass'}/>
                </TechTreeItem>
            </div>
        
            <div css={[css`padding-left: 5px; padding-right: 15px;`]}>             
                <TechTreeItem>
                    <Image width={257} height={174} src={`/img/alvin/minimap_Region.png`} alt={'regoin'}/>
                </TechTreeItem>
            </div>
        
            <TechTreeItem>
                <TechTreeItemRow 
                    type={'title'} 
                    value={'Investment Universe'}
                    spaceWidth = {getSpaceWidths(0,100,0)}
                    onClick={updateUniverseInfoState}
                />
                <TechTreeItemRow 
                    type={'label'} 
                    value={UniverseInfoState['label']}
                    spaceWidth = {getSpaceWidths(0,100,30)}
                    onClick={updateUniverseInfoState}
                />
                <TechTreeItemRow 
                    type={'weightTitle'} 
                    value={'Asset Class'}
                    spaceWidth = {getSpaceWidths(0,100,0)}
                    onClick={updateUniverseInfoState}
                />
                <TechTreeItemRow 
                    type={'weight'} 
                    value={UniverseInfoState['assetClass']}
                    spaceWidth = {getSpaceWidths(0,100,10)}
                    onClick={updateUniverseInfoState}
                />
            </TechTreeItem>
        
            <TechTreeItem bgCol={'#212D34'}>
                <TechTreeItemRow 
                    type={'title'} 
                    value={'Model Selection'}
                    spaceWidth = {getSpaceWidths(10,100,0)}
                    onClick={updateUniverseInfoState}
                />
                <TechTreeItemRow 
                    type={'label'} 
                    value={['Modern Portfolio Theory']}
                    spaceWidth = {getSpaceWidths(10,100,10)}
                    onClick={updateUniverseInfoState}
                />
                <TechTreeItemRow 
                    type={'img'} 
                    value={['/img/alvin/techtree_mpt.png', 183, 124]}
                    spaceWidth = {getSpaceWidths(10,100,10)}
                    onClick={updateUniverseInfoState}
                />
            </TechTreeItem>

        </div>
    )
};

export default TechTree;