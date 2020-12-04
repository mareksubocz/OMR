import os
import imageio
import numpy as np
from glob import glob
from typing import Tuple, Dict, List, Any
import tensorflow as tf
from tensorflow.keras.utils import Sequence
from bs4 import BeautifulSoup as Soup

class DatasetLoader(Sequence):
    def __init__(self, data_path: str, split_name: str, batch_size: int, shuffle: bool = True, seed: int = 0) -> None:

        self.data_path: str = data_path
        self.split_name: str = split_name
        self.batch_size: int = batch_size
        self.shuffle: bool = shuffle
            
        self.seed: int = seed
        np.random.seed(self.seed)
        
        self.dataset: List[Tuple[str, str]] = self.split_dataset()[self.split_name]
        
        self.indexes: np.ndarray = np.arange(len(self.dataset))

    def __len__(self) -> int:
        return self.indexes.shape[0]//self.batch_size
    
    def __getitem__(self, index: int) -> Tuple[np.ndarray, np.ndarray]:
        indexes = self.indexes[index*self.batch_size:(index+1)*self.batch_size]

        x, y = [], []
        for f in self.dataset[indexes]:
            _x, _y = self.load_files(*f)
            x.append(_x)
            y.append(_y)

        return np.array(x), np.array(y)

    def on_epoch_end(self) -> None:
        self.indexes = np.arange(len(self.dataset))

        if self.shuffle:
            np.random.shuffle(self.indexes)
            
    def split_dataset(self, split = (0.8, 0.1, 0.1)) -> Dict[str, List[Tuple[str, str]]]:        
        pngs = glob(f'{self.data_path}/*.png')
        pngs.sort()
        pngs = np.asarray(pngs)
        
        meis = [png.replace('.png', '.mei') for png in pngs]
        
        data = np.asarray(list(zip(pngs, meis)))
        
        indexes = np.arange(len(data))
        np.random.shuffle(indexes)
        indexes = np.split(indexes, [int(split[0] * len(indexes)), int((1-split[2]) * len(indexes))])
        
        split_sets = dict()
        names = ['train', 'val', 'test']
        for name, i in zip(names, indexes):
            split_sets[name] = data[i]
        
        return split_sets
        
    def load_files(self, png_path: str, mei_path: str):
        image = imageio.imread(png_path)
#TODO image resize
        mei = self.parse_mei(mei_path)
        return image, mei
    
    def parse_mei(self, path: str) -> Any:
        with open(path, "r") as f:
            raw_xml = f.read()
        soup = Soup(raw_xml, 'xml') 
#         print(soup.prettify())
#         print(soup.score.prettify())
#TODO parse mei
        return soup.score.prettify()