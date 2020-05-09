import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

const UrlPreview = ({
  title,
  text: description,
  title_link: titleLink,
  og_scrape_url: ogScrapeUrl,
  image_url: imageUrl,
  thumb_url: thumbUrl,
}) => {
  const getDomain = (url) => {
    const domain = url && url.replace('https://', '').replace('http://', '');

    if (!domain) return url;
    const indexOfSlash = domain.indexOf('/');

    if (indexOfSlash === -1) return domain;

    return domain.slice(0, indexOfSlash);
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleUrl}>
          {getDomain(titleLink || ogScrapeUrl)}
        </Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ url: imageUrl || thumbUrl }}
          style={styles.thumbnail}
        />
      </View>
    </TouchableOpacity>
  );
};

UrlPreview.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title_link: PropTypes.string,
  og_scrape_url: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  thumb_url: PropTypes.string.isRequired,
};

UrlPreview.defaultProps = {
  title_link: '',
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 5,
    borderLeftColor: '#E4E4E4',
    paddingLeft: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },
  detailsContainer: {
    flexDirection: 'column',
    flex: 6,
  },
  thumbnailContainer: {
    flex: 1,
  },
  thumbnail: {
    height: 40,
    width: 40,
  },
  titleUrl: {
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    padding: 2,
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
  },
});

export default UrlPreview;
