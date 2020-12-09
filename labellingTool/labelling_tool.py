import cv2 as cv
import argparse
import os
from pprint import pprint

def reset():
    global clean_img, image
    image = clean_img.copy()
def save():
    global data_gathered
    print(data_gathered)
    with open('results.txt', 'w') as file:
        for line in data_gathered:
            file.write(str(line) + '\n')
def quit():
    cv.destroyAllWindows()
    exit(0)


# initialize the list of reference points and boolean indicating
# whether cropping is being performed or not
stepPt = []
seqPt = []
cropping = False
color = (0,255,0)
data_gathered = []
# available: rectangle, dot
sequence = ["rectangle", "dot"]
sequence_step = 0
current_label = ""
pre_rectangle_img = []

def handle_mouse(event, x, y, flags, param):
    global sequence_step, sequence, pre_rectangle_img
    global stepPt, seqPt, cropping, color
    if event == mousebindings['startstep']:
        if sequence[sequence_step] == 'rectangle':
            stepPt = [(x, y)]
            cropping = True
        elif sequence[sequence_step] == 'dot':
            cv.circle(image, (x,y), 4, color, 4)
            seqPt.append([x,y])

    elif event == mousebindings['endstep']:
        if sequence[sequence_step] == 'rectangle':
            stepPt.append((x, y))
            cropping = False
            cv.rectangle(image, stepPt[0], stepPt[1], color, 2)

            # standardized rectangle coordinates
            seqPt.append([
                [min(stepPt[0][0], stepPt[1][0]), min(stepPt[0][1], stepPt[1][1])],
                [max(stepPt[0][0], stepPt[1][0]), max(stepPt[0][1], stepPt[1][1])],
            ])
        stepPt = []
            # cv.imshow("image", image)
        sequence_step += 1
        if sequence_step == len(sequence):
            sequence_step = 0
            seqPt.insert(0, current_label)
            data_gathered.append(seqPt)
            seqPt = []


# to use colors by names run: pip install webcolors
keybindings = {
# 'key': ['label', [RGB color]]
    'f': ['quarter','yellow'],
    'd': ['half','tomato'],
    's': ['full','lightgreen'],
    'a': ['eighth','darkturquoise'],
    'b': ['back', 'hotpink'],
    'R': reset,
    'S': save,
    'Q': quit,
    # '\x1b': quit, # escape key for python ord()
}

mousebindings = {
    'dot': cv.EVENT_RBUTTONDOWN,
    'startstep': cv.EVENT_LBUTTONDOWN,
    'endstep': cv.EVENT_LBUTTONUP,
}


if __name__ == "__main__":
    # command-line argument parsing
    ap = argparse.ArgumentParser(description='Choose images for labeling')
    ap.add_argument('path',
                    type=str,
                    help='path to a file or directory')
    args = ap.parse_args()
    print(os.path.isfile(args.path))
    print(os.path.isdir(args.path))

    pprint(keybindings)

    #FIXME na razie tylko pojedynczy plik
    image = cv.imread(args.path)
    clean_img = image.copy()
    cv.namedWindow("image")
    cv.setMouseCallback("image", handle_mouse)
    while True:
        # handling keyboard input
        cv.imshow("image", image)
        key = cv.waitKey(1) & 0xFF
        if chr(key) != 'ÿ':
            print(chr(key))
        if chr(key) in keybindings.keys():
            # the keybind is for changing label and color
            if type(keybindings[chr(key)]) is list:
                color = keybindings[chr(key)][1]
                if type(color) is str:
                    import webcolors
                    color = list(webcolors.name_to_rgb(color))
                color.reverse()
                current_label = keybindings[chr(key)][0]
                seqPt = []
                sequence_step = 0

            # the keybind is for special function
            elif callable(keybindings[chr(key)]):
                keybindings[chr(key)]()
            else: print("Instruction assigned to this key is incomprehensible.")

    # close all open windows
    cv.destroyAllWindows()
