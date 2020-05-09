import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

const Giphy = ({ title, image_url: imageUrl, thumb_url: thumbUrl }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>Posted using Giphy.com</Text>
      <Image source={{ url: imageUrl || thumbUrl }} style={styles.thumbnail} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 5,
    borderLeftColor: '#E4E4E4',
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: 'column',
  },
  thumbnail: {
    height: 150,
    width: 250,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    color: '#1E75BE',
    padding: 2,
  },
  description: {
    fontFamily: 'Lato-Regular',
    padding: 2,
    fontSize: 13,
    fontWeight: '300',
  },
});

Giphy.propTypes = {
  title: PropTypes.string.isRequired,
  image_url: PropTypes.string,
  thumb_url: PropTypes.string.isRequired,
};

Giphy.defaultProps = {
  image_url: '',
};

export default Giphy;
