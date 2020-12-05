#!/usr/bin/env bash
ARRAY=( 'voice dry cleaner dot com' 'my dry cleaner' 'Apthorp Cleaners' 'Sudsies Cleaners' 'Champion Cleaners' 'The Plaza Cleaners' "J's Cleaners" 'Appearance Plus' 'Collins Cleaners' 'NuTone Cleaners' 'Dublin Cleaners');
SKILL=( 'amzn1.ask.skill.d3cb6156-f160-401c-ab25-fa04fc5c3861' 'amzn1.ask.skill.122709cb-3538-45c3-9496-f956740d5e2a' 'amzn1.ask.skill.c6f0b181-2446-4ac4-89b6-42d8da3a35d2' 'amzn1.ask.skill.0c137450-4b31-49b1-b8d3-ed359a0bbd87' 'amzn1.ask.skill.d1bcb017-ee22-403d-b206-d8fd1cc5fe15' 'amzn1.ask.skill.0b9b0912-5a48-4720-8374-e1ef88caec7a' 'amzn1.ask.skill.5012e8c2-6d4a-4da7-9383-df9df3c10e83' 'amzn1.ask.skill.6824725c-611d-47fa-a01b-0fbd3401ff51' 'amzn1.ask.skill.48f13991-3ffe-4b2a-bf95-3165cdcad45c' 'amzn1.ask.skill.0bbc8cd1-1ab6-40c5-b814-d035965f6471' 'amzn1.ask.skill.95a83517-5356-4d5d-858e-d361c83e746e');
PROFILE=( 'default' 'voice1' 'default' 'voice1' 'voice1' 'voice1' 'voice1' 'default' 'default' 'default' 'default');
ELEMENTS=${#ARRAY[@]}
for ((i=0; i<$ELEMENTS; i++));
do
    echo "Submitting for certification alexaSkill for ${ARRAY[$i]}"
    ask api submit -s ${SKILL[$i]} -p ${PROFILE[$i]}
done
