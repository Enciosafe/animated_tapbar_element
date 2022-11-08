import React, { FC } from 'react';
import {SafeAreaView, Dimensions, StyleSheet, Animated, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import * as shape from 'd3-shape';
import StaticTabbar, {tabHeight as height} from './StaticTabbar';

const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const {width} = Dimensions.get('window');

const tabs = [
    {name: 'grid'},
    {name: 'list'},
    {name: 'refresh-cw'},
    {name: 'box'},
    {name: 'user'},
];

const tabWidth = width / tabs.length;

const tab = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)
    ([
        {x: width, y: 0},
        {x: width + 5, y: 0},
        {x: width + 10, y: 10},
        {x: width + 15, y: height},
        {x: width + tabWidth - 15, y: height},
        {x: width + tabWidth - 10, y: 10},
        {x: width + tabWidth - 5, y: 0},
        {x: width + tabWidth, y: 0},
    ])

const left = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([
        {x: 0, y: 0},
        {x: width, y:0}
    ]);

const right = shape.line()
    .x(d => d.x)
    .y(d => d.y) ([
        {x: width + tabWidth, y: 0},
        {x: width * 2.5, y: 0},
        {x: width * 2.5, y: height},
        {x: 0, y: height},
        {x: 0, y: 0},
    ])

const d = `${left} ${tab} ${right}`;

interface TabbarProps {

}

export const Tabbar: FC<TabbarProps> = () => {

    const value = new Animated.Value(-width);
    return (
        <>
            <View {...{width, height}}>
                <AnimatedSvg width={width * 2.5} {...{height}} style={{transform: [{ translateX: value }]}}>
                    <Path {...{d}} fill='white'/>
                </AnimatedSvg>
                <View style={StyleSheet.absoluteFill}>
                    <StaticTabbar value={value} {...{tabs}}/>
                </View>
            </View>

            <SafeAreaView style={styles.safeArea}/>
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white'
    }
})
