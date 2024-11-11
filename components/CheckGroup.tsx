
import React, { useState } from 'react'
import { Avatar, Card, Icon, ListItem } from "@rneui/themed";
import { StyleSheet } from 'react-native';
import type { CheckListItem } from "@/models";

export default function CheckGruop({ list, onPress }: { list: Array<CheckListItem>, onPress: Function }) {

  
  return (
    <>
      {
        list.map((item, i) => (
          <ListItem key={i} onPress={() => onPress(item.key)} bottomDivider={i !== list.length - 1}
          >
            <ListItem.CheckBox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checked={item.checked}
              onPress={() => onPress(item.key)}
            />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle style={styles.subTitle}>{item.subTitle}</ListItem.Subtitle>
            </ListItem.Content>
            {/* <ListItem.Chevron /> */}
          </ListItem>
        ))
      }
    </>
    
    
    
  )
}

const styles = StyleSheet.create({
  subTitle: {
    color: 'grey',
    fontSize: 13
  }
})