import csv
import os
import re

# this file generates folder structure and READMEs from the exported notion csv we use internally

with open('challenges.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=',')
    line_number = 0
    for row in csv_reader:
        line_number += 1

        # you'll probably need to edit this line if the spreadsheet format changes
        name = row['Name']
        category = row['Category']
        assign = row['Assign']
        difficulty = row['Difficulty']
        points = row.get('Points', 0)
        description = row['Description (Visible to Participants)']
        specification = row['Specification']
        flag = row['Flag']

        name = re.sub(r'[\.\?]+', '', name)
        print('generating...', category, difficulty, name)
        foldername = f'./{category.lower()}/{difficulty.lower()} - {name.lower()}'
        os.makedirs(foldername, exist_ok=True)

        readme = open(f'{foldername}/readme.md', 'w', encoding='utf-8')
        readme.write(f'# {name}\n')
        readme.write(f'## {category} - {difficulty}\n')
        readme.write('| author | first blood | solves | points |\n')
        readme.write('| --- | --- | --- | --- |\n')
        readme.write(f'| {assign} | _ | 0 | {points} |\n')
        readme.write('### prompt\n')
        readme.write(f'{description}\n\n')
        readme.write('### original specification\n')
        readme.write(f'{specification}\n\n')
        readme.write(f'**flag:** `{flag}`\n\n')
        readme.close()
