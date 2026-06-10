export interface BotSlide {
  image: string;
  caption: string;
}

export const BOT_HISTORICAL_STORIES: Record<string, BotSlide[]> = {
  'alexander-the-great': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/AlexanderTheGreat_Bust.jpg',
      caption: "Alexander the Great, King of Macedon, was tutored by Aristotle and ascended to the throne in 336 BC."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/BattleofIssusDetail.jpg',
      caption: "He initiated an ambitious military campaign across Asia Minor, defeating Persian King Darius III."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Macedonian_Empire_336BC-323BC.png',
      caption: "He constructed one of the largest empires of the ancient world before dying undefeated at age 32."
    }
  ],
  'chanakya': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Chanakya_Art.jpg',
      caption: "Chanakya was an ancient Indian teacher, philosopher, and chief advisor to the Mauryan Empire."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Manuscript_page_from_Arthashastra.jpg',
      caption: "He authored the 'Arthashastra', a legendary treatise on political strategy, economics, and statecraft."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Nalanda_University_Ruins_Bihar_India.jpg',
      caption: "He masterminded the overthrow of the Nanda Dynasty, establishing the unified Mauryan dynasty."
    }
  ],
  'chandragupta-maurya': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Statue_of_Chandragupta_Maurya_at_Parliament_of_India.jpg',
      caption: "Chandragupta Maurya founded the Mauryan Empire, unifying the majority of the Indian subcontinent."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Maurya_Empire_Map.png',
      caption: "With Chanakya's strategies, he expanded his borders and defeated the Seleucid Empire."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Shravanabelagola_overview.jpg',
      caption: "Later, he renounced his throne to become a Jain monk, spending his final days in meditation."
    }
  ],
  'emperor-ashoka': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Lion_Capital_of_Ashoka.jpg',
      caption: "Emperor Ashoka the Great expanded the Mauryan Empire to encompass almost all of India."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Relief_depicting_Emperor_Asoka.jpg',
      caption: "Horrified by the casualties of the Kalinga War, he renounced violence and converted to Buddhism."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Sanchi_Stupa.jpg',
      caption: "He erected pillars and rock edicts across his empire, promoting peace, tolerance, and moral conduct."
    }
  ],
  'julius-caesar': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Caesar_Tusculum_Museum_Arles.jpg',
      caption: "Julius Caesar was a brilliant Roman general whose conquests expanded Rome's territory into Gaul."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Rubicon_river.jpg',
      caption: "In 49 BC, he crossed the Rubicon, sparking a civil war that resulted in him becoming Dictator."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/The_Death_of_Caesar%2C_by_Vincenzo_Camuccini.jpg',
      caption: "His assassination on the Ides of March led to the collapse of the Republic and rise of the Empire."
    }
  ],
  'raja-raja-chola-i': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Raja_Raja_Cholan_Statue_inside_Brihadeeswarar_Temple.jpg',
      caption: "Raja Raja Chola I was one of the greatest emperors of the Tamil Chola dynasty."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Brihadisvara_Temple_Thanjavur.jpg',
      caption: "He built the Brihadeeswarar Temple in Thanjavur, an architectural masterpiece of Dravidian art."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Chola_Empire_under_Rajendra_Chola_I.png',
      caption: "He established a powerful navy, conquering Sri Lanka and controlling sea trade routes."
    }
  ],
  'genghis-khan': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Yuan_Emperor_Genghis_Khan.jpg',
      caption: "Born Temüjin, Genghis Khan unified the warring nomadic tribes of Mongolia in 1206."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Mongol_cavalrymen.jpg',
      caption: "He revolutionized military tactics using highly organized, rapid horse-archer divisions."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Mongol_Empire_map.gif',
      caption: "He founded the Mongol Empire, which grew to be the largest contiguous empire in history."
    }
  ],
  'akbar-the-great': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Akbar_the_Great_by_Manohar.jpg',
      caption: "Akbar the Great became the third Mughal Emperor at age 13, establishing centralized control."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/The_Emperor_Akbar_Receiving_Tribute.jpg',
      caption: "He implemented administrative reforms and pursued a policy of absolute religious pluralism."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Buland_Darwaza%2C_Fatehpur_Sikri%2C_India.jpg',
      caption: "He founded the capital city Fatehpur Sikri and patronized arts, science, and philosophy."
    }
  ],
  'chhatrapati-shivaji': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Equestrian_statue_of_Chhatrapati_Shivaji_Maharaj_in_Pune.jpg',
      caption: "Shivaji Maharaj carved out an independent Maratha kingdom, challenging the Mughal Empire."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Shivaji_Raje.jpg',
      caption: "He pioneered guerrilla warfare and tactical surprise, exploiting regional hilly terrains."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Raigad_Fort_Entrance.jpg',
      caption: "He constructed a vast network of hill and sea forts, and established a strong naval presence."
    }
  ],
  'napoleon-bonaparte': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Napoleon4.jpg',
      caption: "Napoleon Bonaparte rose during the French Revolution, crowning himself Emperor of France."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Napoleon_at_the_Battle_of_Austerlitz.jpg',
      caption: "A legendary military commander, he won a series of wars to establish hegemony over Europe."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Napoleon_retreat_from_moscow.jpg',
      caption: "His empire collapsed after the invasion of Russia, concluding with his final defeat at Waterloo."
    }
  ],
  'abraham-lincoln': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Abraham_Lincoln_November_1863.jpg',
      caption: "Abraham Lincoln served as the 16th US President during the American Civil War."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Gettysburg_Address_Lincoln_portrait_resting.jpg',
      caption: "He issued the Emancipation Proclamation in 1863, initiating the abolishment of slavery."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Lincoln_Memorial_inside_virtual_tour.jpg',
      caption: "His leadership successfully preserved the Union and redefined democratic values."
    }
  ],
  'winston-churchill': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Winston_Churchill%2C_1941_photo_by_Yousuf_Karsh.jpg',
      caption: "Winston Churchill served as UK Prime Minister during the critical years of World War II."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Sir_Winston_Churchill_shows_the_%22V%22_sign.jpg',
      caption: "His iconic speeches and stubborn determination galvanized British resistance to Axis powers."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Yalta_Conference_1945_Churchill.jpg',
      caption: "An accomplished author and orator, he was a key architect of the post-war global alliance."
    }
  ],
  'queen-elizabeth-ii': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Queen_Elizabeth_II_in_1959.jpg',
      caption: "Queen Elizabeth II ascended the throne in 1952, reigning through seven decades of history."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Buckingham_Palace_front_full_view.jpg',
      caption: "She oversaw the transition from the British Empire to the modern Commonwealth of Nations."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Queen_Elizabeth_II_in_2015.jpg',
      caption: "Her long reign represented global continuity, dedication to duty, and diplomatic stability."
    }
  ],
  'nelson-mandela': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Nelson_Mandela_1994.jpg',
      caption: "Nelson Mandela was a South African revolutionary who led the struggle against apartheid."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Nelson_Mandela_Cell_Robben_Island.jpg',
      caption: "He spent 27 years in prison on Robben Island, becoming a global symbol of resilience."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Nelson_Mandela_and_FW_de_Klerk.jpg',
      caption: "He won the Nobel Peace Prize and was elected South Africa's first democratic President."
    }
  ],
  'donald-trump': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait_2017.jpg',
      caption: "Donald Trump, a prominent real estate developer and media star, was elected 45th US President."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Trump_Tower_NYC.jpg',
      caption: "He developed major properties worldwide and hosted the famous reality show 'The Apprentice'."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Donald_Trump_at_Rally_in_Des_Moines%2C_Iowa.jpg',
      caption: "His populist 'Make America Great Again' movement reshaped the US political landscape."
    }
  ],
  'vladimir-putin': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Vladimir_Putin_official_portrait.jpg',
      caption: "Vladimir Putin has served as Russia's President or Prime Minister since December 1999."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Moscow_Kremlin_viewed_from_across_Moscow_River.jpg',
      caption: "A former intelligence officer, he consolidated central power within the Kremlin."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Vladimir_Putin_at_Valdai_2022.jpg',
      caption: "His administration has focused on reasserting Russian influence in global geopolitics."
    }
  ],
  'narendra-modi': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Narendra_Modi_official_portrait_2019.jpg',
      caption: "Narendra Modi served as Chief Minister of Gujarat before becoming Prime Minister of India in 2014."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/New_Parliament_House_of_India_night.png',
      caption: "He initiated digital transformations, massive infrastructure campaigns, and social welfare programs."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/PM_Modi_at_G20.jpg',
      caption: "Under his leadership, India expanded its geopolitical clout and economic output globally."
    }
  ],
  'elon-musk': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop1%29.jpg',
      caption: "Elon Musk co-founded PayPal and went on to establish SpaceX and Tesla Motors."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Falcon_Heavy_Demoflight_%282018-073%29.jpg',
      caption: "With SpaceX, he pioneered reusable rockets, dramatically reducing the cost of space exploration."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Tesla_Model_S_02_2013_1366.jpg',
      caption: "Through Tesla, he accelerated the global transition to electric vehicles and clean energy."
    }
  ],
  'larry-page': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Larry_Page_in_the_European_Parliament%2C_2009_%28cropped%29.jpg',
      caption: "Larry Page co-founded Google with Sergey Brin in 1998 while studying at Stanford."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Google_initial_server.jpg',
      caption: "He invented the PageRank algorithm, which formed the foundation of Google's search engine."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Google_plex.jpg',
      caption: "He served as CEO of Google and Alphabet, expanding into mobile systems, maps, and AI."
    }
  ],
  'gotham-chess': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Levy_Rozman_cropped.jpg',
      caption: "Levy Rozman (GothamChess) is a chess International Master and top global content creator."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Chess_pieces_setup.jpg',
      caption: "He popularized chess education, making complex openings accessible to millions of viewers."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Rozman_commentating.jpg',
      caption: "His channel grew rapidly during the online chess boom, offering high-energy game recaps."
    }
  ],
  'pragg': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Rameshbabu_Praggnanandhaa_Tata_Steel_Chess_2023.jpg',
      caption: "Praggnanandhaa became a Grandmaster at age 12, marking him as one of history's top prodigies."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Pragg_vs_Carlsen_World_Cup.jpg',
      caption: "He defeated multiple world-class players to reach the 2023 FIDE World Cup Final."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Indian_chess_olympiad_team.jpg',
      caption: "Pragg represents India's new golden age of chess, combining tactical brilliance and poise."
    }
  ],
  'magnus': [
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Magnus_Carlsen_at_the_Tata_Steel_Chess_Tournament_2020.jpg',
      caption: "Magnus Carlsen became the World Chess Champion in 2013 and has dominated the sport since."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Carlsen_playing_rapid.jpg',
      caption: "He achieved the highest chess rating of all time (2882) and holds multiple world titles."
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Carlsen_endgame_mastery.jpg',
      caption: "Renowned for his perfect endgame precision, he converts minor advantages into victories."
    }
  ]
};
